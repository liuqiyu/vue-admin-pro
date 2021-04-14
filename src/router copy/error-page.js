import Layout from '@/views/layout'

export default {
  path: '/error',
  name: 'Error',
  showRoot: true,
  meta: {
    icon: 'icon-yichangguanli',
    title: '错误页面'
  },
  component: Layout,
  children: [{
    path: '404',
    name: 'error-404',
    component: () =>
        import(/* webpackChunkName: "errorPage" */ '@/views/error/404'),
    meta: {
      title: '404'
    }
  },
  {
    path: '401',
    name: 'error-401',
    component: () =>
        import(/* webpackChunkName: "errorPage" */ '@/views/error/401'),
    meta: {
      title: '401'
    }
  }
  ]
}
