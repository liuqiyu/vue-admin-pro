import Vue from 'vue'
import Router from 'vue-router'
import Layout from './../views/layout'
import store from './../store'
import {
  getRoutes
} from './../utils/router'
import login from './../views/login'

Vue.use(Router)

const routerModule = getRoutes(
  require.context('./', false, /\.js$/),
  './index.js'
)

export const layoutRoutes = [{
    path: '',
    // name: 'dashboard',
    redirect: 'dashboard',
    component: Layout,
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard'),
      meta: {
        icon: 'icon-shouye',
        tag: '/dashboard',
        title: '首页',
        affix: true
      }
    }]
  },
  ...routerModule
]

store.commit('router/SET_ROUTER', layoutRoutes)

const routes = [{
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页'
    },
    component: login
  },
  ...layoutRoutes,
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404')
  }
]

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
