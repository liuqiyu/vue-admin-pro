import Layout from '@/views/layout'
const Error404 = () =>
  import(/* webpackChunkName: "errorPage" */ '@/views/error/404')
const Error401 = () =>
  import(/* webpackChunkName: "errorPage" */ '@/views/error/401')

export default {
  path: '/error',
  name: 'Error',
  meta: {
    icon: 'icon-biaoge',
    tag: '/table/index',
    title: '表格'
  },
  component: Layout,
  children: [{
    path: '404',
    name: 'error-404',
    component: Error404,
    meta: {
      tag: '/table/default',
      title: '表格弹窗',
      affix: false
    }
  },
  {
    path: '401',
    name: 'error-401',
    component: Error401,
    meta: {
      tag: '/table/details',
      title: '表格详情',
      affix: false
    }
  }
  ]
}
