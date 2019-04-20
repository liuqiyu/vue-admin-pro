import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "echarts" */ './../views/echarts')
const Add = () => import(/* webpackChunkName: "echarts" */ '../views/echarts/add')

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
      }
    ]
  }
]
