import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import AspUI from './components'
import './assets/scss/index.scss'
import http from './utils/http'
import * as filters from './utils/filter'

let deviceWidth
setHtmlFontSize()

if (window.addEventListener) {
  window.addEventListener('resize', function () {
    setHtmlFontSize()
  }, false)
}
function setHtmlFontSize () {
  // 1366是设计稿的宽度，当大于1366时采用1366宽度，比例也是除以13.66
  deviceWidth = document.documentElement.clientWidth > 1366 ? 1366 : document.documentElement.clientWidth
  console.log(deviceWidth)
  document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 13.66 + 'px !important'
}

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(AspUI)

Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
