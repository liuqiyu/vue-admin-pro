import axios from 'axios'
import store from '../store'
import {
  Message
} from 'element-ui'
import {
  APPKEY,
  REST,
  ENV
} from '../config'
import {
  random
} from './common'
import {
  getToken
} from './token'
import ERPcache from './cache-plugin'
import LogPlugin from './log-plugin'
import {
  cloneDeep
} from 'lodash'

const ERPlog = new LogPlugin()

const CancelToken = new axios.CancelToken(cancel => cancel())

const TOKEN_ERROR_CODES = [100201, 6001]

const TIMEOUT = 40000

const ERRORS = {
  'Network Error': '网络错误，请检查网络',
  [`timeout of ${TIMEOUT}ms exceeded`]: '请求超时，服务器未响应',
  'Internal Server Error': '内部服务器错误',
  api: '接口错误'
}

// 用户ID-时间戳-4位随机数-前端menuID
const getWebTraceId = () => {
  let userId = store.state.user.id || 'xxxx'
  let menuId = window.__ERPMODULE__.id || 'xxxx'
  return `${userId}-${Date.now()}-${random(4)}-${menuId}`
}

const httpPending = {}
const removeHttpPending = (config, isRemove = true) => {
  if (!config || !config.headers.method) {
    return false
  }
  let key = config.headers.method
  let val = typeof config.data === 'object' ? JSON.stringify(config.data) : config.data
  if (httpPending[key] === val) {
    if (isRemove) {
      delete httpPending[key]
    } else {
      console.warn(`[${key}]: repeated http request`)
    }
    return true
  }
  httpPending[key] = val
  return false
}

const service = axios.create({
  timeout: TIMEOUT,
  headers: {
    'format': 'JSON'
  }
})

service.interceptors.request.use(config => {
  try {
    ERPlog.handerConfig(config)
  } catch (e) {
    console.log(e)
  }
  let oldMethod = config.headers.method || ''
  let method = oldMethod.replace(/\$/g, '')
  config.headers.method = method
  if (!config.url) {
    config.url = `${REST}?${method}`
  }
  config.data = config.data || {}

  console.log(removeHttpPending(config, false))
  // 防止重复提交
  if (removeHttpPending(config, false)) {
    config.cancelToken = CancelToken
  }

  if (method) {
    let opt = config.headers.appkey
    if (!opt) {
      // 添加符合通用规则的 appkey
      config.headers.appkey = APPKEY[oldMethod.split('.')[0]]
      // 不显示 Message
      if (opt === false) {
        config.$config = {
          cancel: true
        }
      }
    } else if (typeof opt === 'object') {
      // 自定义配置
      config.$config = opt
      if (opt && opt.appkey) {
        config.headers.appkey = opt.appkey
      }
    }
    // 日志记录请求头
    config.headers.webTraceId = getWebTraceId()
    // 数据权限范围控制
    config.headers['X-menu-id'] = window.__ERPMODULE__.id || ''
  }
  config.headers.token = getToken()
  return config
})

service.interceptors.response.use(response => {
  try {
    // 后期优化为订阅分发
    ERPlog.push(response)
    ERPcache.save(response)
  } catch (e) {
    console.log(e)
  }
  removeHttpPending(response.config)
  // 文件流下载
  if (response.data instanceof Blob) {
    return response.data
  }
  let data = typeof response.data === 'object' ? response.data : {}
  if (data.code === 0) {
    return data.data
  }
  let method = response.config.headers.method || response.config.url
  let $config = response.config.$config
  let msg = ($config && $config.msg) || data.msg || data.error || ERRORS.api
  let isDev = !ENV || ENV === 'dev'
  if (isDev) {
    msg = `${method} : ${msg}`
  } else if (!isDev && !data.hasOwnProperty('code')) {
    msg = ERRORS[msg] || msg
  }
  if (msg && (!$config || !$config.cancel)) {
    Message({
      message: msg,
      type: 'error',
      duration: 2500
    })
  }
  data.message = msg
  data.method = method
  if (TOKEN_ERROR_CODES.includes(data.code)) {
    location.hash = '#/error?type=5'
  }
  return Promise.reject(data)
}, error => {
  removeHttpPending(error.config)
  let msg = error.message
  if (msg) {
    error.message = ERRORS[msg] || msg
    Message({
      message: error.message,
      type: 'error',
      duration: 2500
    })
  }
  return Promise.reject(error.response)
})

export default service

/**
 * 封装 http
 * @param method: open api code
 * @param data: request body
 * @param opt: string | boolean | object
 * @returns {AxiosPromise}
 * opt:
 *   string: appkey不符合通用规则时，值为特殊的appkey
 *   boolean: 接口出错时是否弹出提示信息
 *   object: 自定义配置，比如替换接口的错误提示信息
 *   {
 *     appkey: '1',
 *     msg: '自定义错误提示信息',
 *     cancel: true, // 接口调用失败时是否提示错误信息
 *     axios: {} // axios request config
 *   }
 */
export const http = async (method, data, opt) => {
  let cacheData = await ERPcache.get(method, data)
  if (cacheData) {
    console.info('[cache-plugin] data from cache:', method, cacheData)
    return Promise.resolve(cacheData)
  }
  const cof = {
    method: 'post',
    data,
    headers: {
      method
    }
  }
  if (opt && opt.axios) {
    opt = cloneDeep(opt)
    if (opt.axios.headers) {
      Object.assign(opt.axios.headers, cof.headers)
    }
    Object.assign(cof, opt.axios)
  } else {
    cof.headers.appkey = opt
  }
  return service(cof)
}
