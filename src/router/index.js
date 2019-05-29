import Vue from 'vue'
import Router from 'vue-router'
import Layout from './../views/layout'
import home from './../views/home'
import store from './../store'
import { getRoutes } from './../utils/router'
import login from './../views/login'

Vue.use(Router)

const routerModule = getRoutes(require.context('./', false, /\.js$/), './index.js')

console.log(routerModule)

export const layoutRoutes = [
  {
    path: '',
    name: 'home',
    meta: {
      title: '首页'
    },
    redirect: 'home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: home,
        meta: {
          tag: '/home',
          title: '首页',
          affix: true
        }
      }
    ]
  },
  ...routerModule
]


store.commit('SET_ROUTER', layoutRoutes)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页'
    },
    component: login
  },
  ...layoutRoutes
]

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
