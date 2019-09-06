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
  },
  {
    path: 'details/details/:id',
    name: 'details-table-details',
    component: TableDetails,
    meta: {
      tag: '/table/details',
      title: '详情表格-详情',
      affix: false,
      pageType: true
    }
  },
  {
    path: 'custom-header',
    name: 'custom-header-table',
    component: CustomHeader,
    meta: {
      tag: '/table/custom-header',
      title: '自定义表头',
      affix: false
    }
  }
  ]
}