import Layout from './../views/layout'

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
    component: () =>
        import(/* webpackChunkName: "table" */ './../views/table/default'),
    meta: {
      tag: '/table/default',
      title: '表格弹窗',
      affix: false
    }
  },
  {
    path: 'details',
    name: 'details-table',
    component: () =>
        import(/* webpackChunkName: "table" */ './../views/table/details'),
    meta: {
      tag: '/table/details',
      title: '表格详情',
      affix: false
    }
  },
  {
    path: 'details/details/:id',
    name: 'details-table-details',
    component: () =>
        import(/* webpackChunkName: "table" */ './../views/table/details/details'),
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
    component: () =>
        import(/* webpackChunkName: "table" */ './../views/table/custom-header'),
    meta: {
      tag: '/table/custom-header',
      title: '自定义表头',
      affix: false
    }
  }
  ]
}
