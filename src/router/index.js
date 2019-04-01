import Vue from 'vue'
import Router from 'vue-router'
import Layout from './../views/layout'
import home from './../views/home'
import store from './../store'
import { getRoutes } from './../utils/router'

Vue.use(Router)

console.log(store)

const routerModule = getRoutes(require.context('./', false, /\.js$/), './index.js')

store.commit('SET_ROUTER', routerModule)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
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
})
