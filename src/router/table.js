import Layout from './../views/layout'
const Default = () =>
  import(/* webpackChunkName: "table" */ './../views/table/default')
const Details = () =>
  import(/* webpackChunkName: "table" */ './../views/table/details')
const TableDetails = () =>
  import(/* webpackChunkName: "table" */ './../views/table/details/details')
const CustomHeader = () =>
  import(/* webpackChunkName: "table" */ './../views/table/custom-header')

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
    name: '/table/default',
    component: Default,
    meta: {
      tag: '/table',
      title: '表格弹窗',
      affix: false
    }
  },
  {
    path: 'details',
    name: '/table/details',
    component: Details,
    meta: {
      tag: '/table',
      title: '表格详情',
      affix: false
    }
  },
  {
    path: 'details/details',
    name: '/table/details/details',
    component: TableDetails,
    meta: {
      tag: '/table',
      title: '详情表格-详情',
      affix: false,
      pageType: true
    }
  },
  {
    path: 'custom-header',
    name: '/table/custom-header',
    component: CustomHeader,
    meta: {
      tag: '/table',
      title: '自定义表头',
      affix: false
    }
  }
  ]
}
