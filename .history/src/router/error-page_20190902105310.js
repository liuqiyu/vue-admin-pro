import Layout from '@/views/layout'
const Error404 = () =>
  import(/* webpackChunkName: "errorPage" */ '@/views/error/404')
const Error401 = () =>
  import(/* webpackChunkName: "errorPage" */ '@/views/error/401')

export default {
  path: '/table',
  name: 'Table',
  meta: {
    icon: 'icon-biaoge',
    tag: '/table/index',
    title: '表格'
  },
  component: Layout,
  children: [{
    path: 'default',
    name: 'default-table',
    component: Default,
    meta: {
      tag: '/table/default',
      title: '表格弹窗',
      affix: false
    }
  },
  {
    path: 'details',
    name: 'details-table',
    component: Details,
    meta: {
      tag: '/table/details',
      title: '表格详情',
      affix: false
    }
  }
  ]
}
