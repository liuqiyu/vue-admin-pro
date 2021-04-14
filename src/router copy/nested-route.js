import Layout from './../views/layout'

export default {
  path: '/nested-route',
  component: Layout,
  showRoot: true,
  meta: {
    icon: 'icon-lianjie',
    title: '嵌套路由',
    notLink: true
  },
  children: [{
    path: 'route1',
    name: 'route1',
    component: () =>
        import(/* webpackChunkName: "nested-route" */ './../views/nested-route/route-1.vue'),
    meta: {
      title: '路由1'
    }
  },
  {
    path: 'route2',
    name: 'route2',
    component: () =>
        import(/* webpackChunkName: "nested-route" */ './../views/nested-route/route-2.vue'),
    meta: {
      title: '路由2'
    }
  },
  {
    path: 'route3',
    name: 'route3',
    component: () =>
        import(/* webpackChunkName: "nested-route" */ './../views/nested-route/route-3.vue'),
    meta: {
      title: '路由3',
      notLink: true
    },
    children: [{
      path: 'route3-1',
      name: 'route3-1',
      component: () =>
          import(/* webpackChunkName: "nested-route" */ './../views/nested-route/route-3-1.vue'),
      meta: {
        title: '路由3-1',
        notLink: true
      },
      children: [{
        path: 'route3-1-1',
        name: 'route3-1-1',
        component: () =>
            import(/* webpackChunkName: "nested-route" */ './../views/nested-route/route-3-1-1.vue'),
        meta: {
          title: '路由3-1-1'
        }
      }]
    }]
  }
  ]
}
