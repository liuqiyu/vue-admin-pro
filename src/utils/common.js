import moment from 'moment'
import { MessageBox } from 'element-ui'
import service, { http } from './http'
import store from '../store'

moment.locale('zh-cn')

export const getRoutes = (context, ignore) => {
  const children = []
  context.keys().forEach(key => {
    if (key !== ignore) {
      let arr = context(key).default
      if (arr && arr.length) {
        children.push(...arr)
      }
    }
  })
  return children
}

export const registerStoreModule = (module, name) => {
  let need = Object.values(module).some(v => Object.keys(v).length > 0)
  if (need) {
    store.registerModule(name, module)
  }
}

export const createModuleLayout = (name) => {
  return {
    name,
    render (h) {
      // 这里需要使用transition，否则多个路由渲染同一个组件时，路由守卫触发时机不正确
      // https://github.com/vuejs/vue-router/issues/750
      return (
        <transition css={ false } name="fade" mode="out-in">
          <keep-alive include={ this.cachedViews }>
            <router-view class={ name } />
          </keep-alive>
        </transition>
      )
    },
    computed: {
      cachedViews () {
        return this.$store.state.tagsView.cachedViews
      }
    }
  }
}

// 添加字体图标样式
export const addIconfontLink = (url) => {
  if (!document.head.querySelector(`link[href="//iconfont.kye-erp.com/t/${url}"]`)) {
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `//iconfont.kye-erp.com/t/${url}`
    document.head.appendChild(link)
  }
}

export const localPageSize = (vm) => {
  let size = vm.$pagination.pageSize
  try {
    let json = localStorage.getItem('GLOBAL_PAGINATION')
    if (json) {
      const tag = vm.tag
      json = JSON.parse(json)
      if (json[tag]) {
        size = json[tag]
      }
    }
  } catch (e) {
  }
  return size
}

export const defineFreezeProperty = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    enumerable: false,
    configurable: false,
    writable: true,
    value
  })
}

export const random = (count) => {
  let num = Date.now() + Math.floor(1000 * Math.random() + 1000)
  if (count) {
    return num.toString().substr(-count)
  }
  return num.toString()
}

export const filterParams = (params, filterStr = '****') => {
  let result = JSON.parse(JSON.stringify(params))
  let recursive = (obj) => {
    let keys = Object.getOwnPropertyNames(obj)
    if (keys[keys.length - 1] === 'length') {
      keys.pop()
    }
    keys.forEach(k => {
      if (obj[k] && typeof obj[k] === 'object') {
        recursive(obj[k])
        if (Object.getOwnPropertyNames(obj[k]).length === 0) {
          Reflect.deleteProperty(obj, k)
        }
      } else {
        if (
          (obj[k + 'MaskSec'] && obj[k + 'MaskSec'] === 1) ||
          (obj[k + 'Mask'] && String(obj[k]).indexOf(filterStr) > -1) ||
          (obj[k + 'Virtual'])
        ) {
          Reflect.deleteProperty(obj, k)
        }
      }
    })
  }
  recursive(result)
  return result
}

// 1111 -> 壹仟壹佰壹拾壹元整
// 数字转金额大写文字
export const digitUppercase = (n) => {
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
  let head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
}

// 虚拟号获取是否有缓存登录人手机
let getVirtualPhoneNumber = () => {
  let localStorageNumber = localStorage.virtualPhoneNumber || ''
  let virtualPhoneNumber = ''
  let interval = '__'
  let employeeNumber = store.getters.user.employeeNumber
  let numberArr = localStorageNumber.split(interval)
  if (localStorageNumber && numberArr[0] === employeeNumber) {
    virtualPhoneNumber = numberArr[1]
  } else {
    localStorage.removeItem('virtualPhoneNumber')
  }
  return virtualPhoneNumber
}

// 解密监控字段、虚拟号码
export const decrypt = async (params, type) => {
  let data = ''
  if (type === 'mask') {
    await MessageBox.confirm('查看此内容将被监控，是否继续?', '提示')
    data = await http('syslog.sensitiveFieldViewLog.save', {
      dataId: params.dataId,
      moduleCode: params.moduleCode,
      fieldName: params.fieldName,
      fieldContent: params.fieldContent
    })
  } else if (type === 'virtual') {
    let virtualPhoneNumber = getVirtualPhoneNumber()
    let { value } = await MessageBox.prompt('请输入呼出号码', '提示', {
      customClass: 'virtual-number-prompt',
      inputValue: virtualPhoneNumber || store.getters.user.companyMobile || '',
      inputPattern: /(^1[3|4|5|6|7|8|9][0-9]\d{8}$)|(^(\d{3,4}-?\d{3,8})+(-\d{1,4})?$)/,
      inputErrorMessage: '电话号码不正确'
    })
    data = await http('baseconfig.virtualPhone.getVirtualNumber', {
      dataId: params.dataId,
      moduleCode: params.moduleCode,
      fieldName: params.fieldName,
      fieldContent: params.fieldContent,
      calloutPhone: value,
      source: 10
    })
    // 产品需求，如果拨打成功虚拟号码，默认缓存到本地，下次直接获取，加入工号判断是否登录本人
    if (data) localStorage.virtualPhoneNumber = `${store.getters.user.employeeNumber}__${value}`
  }
  return data
}

// 文件流 下载
export const exportFile = async (url, data, fileName) => {
  let isOpen = url.includes('.')
  let stream = await service({
    url: isOpen ? '' : url,
    method: 'post',
    headers: { method: isOpen ? url : '' },
    responseType: 'blob',
    data: data || {}
  })
  if (!fileName || fileName.startsWith('.')) {
    fileName = `${moment().format('YYYYMMDDHHmmssSSS')}${fileName || '.xls'}`
  }
  let blob = new Blob([stream])
  if ('download' in document.createElement('a')) {
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL对象
    document.body.removeChild(elink)
  }
}

// 设置工单插件所需数据
export const SET_ERPMODULEDATA = (data = null) => {
  if (typeof data === 'object') {
    data = JSON.parse(JSON.stringify(data))
  }
  window.__ERPMODULEDATA__ = data
}
