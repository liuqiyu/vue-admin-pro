import axios from 'axios'
import {
  Message
} from 'element-ui'
import {
  host
} from './../config'

const service = axios.create({
  baseURL: host
  // timeout: 20000
  // headers: { format: 'JSON' }
})

service.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

// 添加请求拦截器
service.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 返回处理
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 2500
      })
      return response
    }
    return response.data.data
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 2500
    })
    return Promise.reject(error)
  }
)

export default service
