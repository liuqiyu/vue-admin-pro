import Layout from './../views/layout'
const Index = () =>
  import(/* webpackChunkName: "echarts" */ './../views/echarts/index.vue')

export default [
  {
    path: '/echarts',
    name: 'echarts',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '/echarts/index',
        component: Index,
        meta: {
          icon: 'icon-ditumap29',
          tag: '/echarts/index',
          title: '图表'
        }
      }
    ]
  }
]
