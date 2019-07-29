import Layout from './../views/layout'
const Route1 = () =>
  import(/* webpackChunkName: "nested-route" */ './../views/nested-route/route-1.vue')
const Route2 = () =>
  import(/* webpackChunkName: "nested-route" */ './../views/nested-route/route-2.vue')
const Route3 = () =>
  import(/* webpackChunkName: "nested-route" */ './../views/nested-route/route-3.vue')

export default [
  {
    path: '/nested-route',
    name: 'nestedRoute',
    component: Layout,
    meta: {
      icon: 'icon-lianjie',
      title: '嵌套路由'
    },
    children: [
      {
        path: 'route1',
        name: 'route1',
        component: Route1,
        meta: {
          tag: '/echarts/index',
          title: '路由1'
        }
      },
      {
        path: 'route2',
        name: 'route2',
        component: Route2,
        meta: {
          tag: '/echarts/index',
          title: '路由2'
        }
      },
      {
        path: 'route3',
        name: 'route3',
        component: Route3,
        meta: {
          tag: '/echarts/index',
          title: '路由3'
        },
        children: [
          {
            path: 'route3-1',
            name: 'route3-1',
            component: Route1,
            meta: {
              tag: '/echarts/index',
              title: '路由3-1'
            },
            children: [
              {
                path: 'route3-1-1',
                name: 'route3-1-1',
                component: Route1,
                meta: {
                  tag: '/echarts/index',
                  title: '路由3-1-1'
                }
              }
            ]
          }
        ]
      }
    ]
  }
]
