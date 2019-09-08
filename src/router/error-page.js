import Layout from '@/views/layout'
const Error404 = () =>
  import(/* webpackChunkName: "errorPage" */ '@/views/error/404')
const Error401 = () =>
  import(/* webpackChunkName: "errorPage" */ '@/views/error/401')

export default {
  path: '/error',
  name: 'Error',
  meta: {
    icon: 'icon-yichangguanli',
    tag: '/table/index',
    title: '错误页面'
  },
  component: Layout,
  children: [{
    path: '404',
    name: 'error-404',
    component: Error404,
    meta: {
      tag: '/error',
      title: '404',
      affix: false
    }
  },
  {
    path: '401',
    name: 'error-401',
    component: Error401,
    meta: {
      tag: '/error',
      title: '401',
      affix: false
    }
  }
  ]
}
