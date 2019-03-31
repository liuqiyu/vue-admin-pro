import Vue from 'vue'
import Router from 'vue-router'
import Layout from './../views/layout'
import { getRoutes } from './../utils/router'

Vue.use(Router)

const routerModule = getRoutes(require.context('./', false, /\.js$/), './index.js')
console.log(routerModule)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        ...routerModule
      ]
    }
  ]
})
