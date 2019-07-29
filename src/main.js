import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import AspUI from './components'
import './assets/scss/index.scss'
import http from './utils/http'
import * as filters from './utils/filter'
import './permission'
// import './utils/rem'
import './mock/index'
console.log(process.env.NODE_ENV)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'mini' })
Vue.use(AspUI)

Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
