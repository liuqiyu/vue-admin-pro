import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "echarts" */ './../views/echarts/index.vue')

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
      }
    ]
  }
]
