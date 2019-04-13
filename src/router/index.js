import Vue from 'vue'
import Router from 'vue-router'
import Layout from './../views/layout'
import home from './../views/home'
import store from './../store'
import { getRoutes } from './../utils/router'

Vue.use(Router)

console.log(store)

const routerModule = getRoutes(require.context('./', false, /\.js$/), './index.js')

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      name: '首页',
      dropMenu: false
    },
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: home
      }
    ]
  },
  ...routerModule
]

store.commit('SET_ROUTER', routes)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
