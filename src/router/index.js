import Vue from 'vue'
import Router from 'vue-router'
import Layout from './../views/layout'
import home from './../views/home'
import store from './../store'
import { getRoutes } from './../utils/router'

Vue.use(Router)

const routerModule = getRoutes(require.context('./', false, /\.js$/), './index.js')

console.log(routerModule)

export const routes = [
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

console.log(routes)

store.commit('SET_ROUTER', routes)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
