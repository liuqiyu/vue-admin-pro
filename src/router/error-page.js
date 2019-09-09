import Layout from '@/views/layout'

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
    component: () =>
        import(/* webpackChunkName: "errorPage" */ '@/views/error/404'),
    meta: {
      tag: '/error',
      title: '404',
      affix: false
    }
  },
  {
    path: '401',
    name: 'error-401',
    component: () =>
        import(/* webpackChunkName: "errorPage" */ '@/views/error/401'),
    meta: {
      tag: '/error',
      title: '401',
      affix: false
    }
  }
  ]
}
