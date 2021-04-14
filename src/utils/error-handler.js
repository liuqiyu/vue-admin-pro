import { ENV } from '../config'
import { http } from '../utils/http'
import store from '../store'

const enable = ['sit', 'uat', 'prd'].includes(ENV)

const report = (params) => {
  http('syslog.frontendOperationLog.save', params, false)
}

const install = (Vue) => {
  if (!ENV) return
  const error = Vue.config.errorHandler

  Vue.config.errorHandler = (err, vm, info) => {
    if (enable) {
      let user = store.getters.user
      let tag = vm.$router.history.current.meta.tag
      let menu = store.getters.menus[tag] || {}

      report({
        userId: user.id,
        userName: user.name,
        menuId: menu.id,
        menuName: menu.$title,
        error: err.stack,
        option: JSON.stringify({
          url: location.hash,
          ua: window.navigator.userAgent,
          info: info,
          component: vm.$vnode.componentOptions.tag
        })
      })
    }

    if (typeof error === 'function') {
      error.call(Vue, err, vm, info)
    }
  }
}

export default install
