import Layout from './../views/layout'

export default {
  path: '/table',
  name: 'Table',
  showRoot: true,
  meta: {
    icon: 'icon-biaoge',
    title: '表格'
  },
  component: Layout,
  children: [{
    path: 'default',
    name: 'default-table',
    component: () =>
        import(/* webpackChunkName: "table" */ './../views/table/default'),
    meta: {
      noCache: true,
      title: '表格'
    }
  },
  {
    path: 'edit-table',
    name: 'edit-table',
    component: () =>
        import(/* webpackChunkName: "table" */ './../views/table/edit-table'),
    meta: {
      activeMenu: '/table/page',
      noCache: true,
      title: '编辑表格'
    }
  },
  {
    path: 'page',
    name: 'page-table',
    component: () =>
        import(/* webpackChunkName: "table" */ './../views/table/page'),
    meta: {
      activeMenu: '/table/page',
      noCache: true,
      title: '页面'
    }
  },
  {
    path: 'page/add',
    name: 'page-table-add',
    hidden: true,
    component: () =>
        import(/* webpackChunkName: "table" */ './../views/table/page/add'),
    meta: {
      activeMenu: '/table/page',
      title: '页面-新增'
    }
  },
  {
    path: 'page/details/:id',
    name: 'page-table-details',
    hidden: true,
    component: () =>
        import(/* webpackChunkName: "table" */ './../views/table/page/details'),
    meta: {
      activeMenu: '/table/page',
      title: '页面-详情'
    }
  },
  {
    path: 'custom-header',
    name: 'custom-header-table',
    component: () =>
        import(/* webpackChunkName: "table" */ './../views/table/custom-header'),
    meta: {
      noCache: true,
      title: '自定义表头'
    }
  }
  ]
}
