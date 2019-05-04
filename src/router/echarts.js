import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "echarts" */ './../views/echarts')
const Add = () => import(/* webpackChunkName: "echarts" */ '../views/echarts/add')
const Map = () => import(/* webpackChunkName: "echarts" */ '../views/echarts/map')

export default [
  {
    path: '/echarts',
    name: 'echarts',
    component: Layout,
    meta: {
      title: '地图'
    },
    children: [
      {
        path: 'index',
        name: '/echarts/index',
        component: Index,
        meta: {
          tag: '/echarts/index',
          title: '图表1'
        }
      },
      {
        path: 'add',
        name: '/echarts/add',
        component: Add,
        meta: {
          tag: '/echarts/index',
          title: '图表2'
        }
      },
      {
        path: 'map',
        name: '/echarts/map',
        component: Map,
        meta: {
          tag: '/echarts/index',
          title: '地图'
        }
      }
    ]
  }
]
