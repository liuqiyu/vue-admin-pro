import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import SmartUI from './components'
import './style/index.scss'
import http from './utils/http'
import './permission'
import './mock/index'

Vue.config.productionTip = false
Vue.config.devtools = true

// 检测 localStorage 是否超出容量
try {
  localStorage.setItem('checklocalstorage', 1)
  localStorage.removeItem('checklocalstorage')
} catch (e) {
  localStorage.clear()
}

Vue.use(ElementUI, {
  size: 'mini'
})
Vue.use(SmartUI)

Vue.prototype.$http = http
// Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
