import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'
import { getRoutes } from '@/utils/router'
import login from '@/views/login'

Vue.use(Router)
// 路由模块
const routerModule = getRoutes(
  require.context('./', false, /\.js$/),
  './index.js'
)

// 异步路由
export const asyncRoutes = [
  ...routerModule,
  // 外链
  {
    path: 'link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/liuqiyu/vue-admin-pro',
        meta: { title: '外链', icon: 'icon-caozuo-wailian' }
      }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: '/error/404'
  }
]

// 常量路由
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: {
      title: '登录页'
    },
    component: login
  },
  {
    path: '',
    redirect: 'dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard'),
        meta: {
          icon: 'icon-shouye2',
          activeMenu: '/dashboard',
          title: '首页',
          affix: true
        }
      }
    ]
  }
]

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRoutes
})
