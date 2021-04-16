import Layout from '@/views/layout'

export default {
  path: '/echarts',
  component: Layout,
  showRoot: true, // will show root menu
  meta: {
    icon: 'icon-chart',
    title: '图表'
  },
  children: [
    {
      path: 'map',
      name: 'echarts-map',
      component: () =>
        import(/* webpackChunkName: "echarts" */ '@/views/echarts/map'),
      meta: {
        title: '地图'
      }
    },
    {
      path: 'line',
      name: 'echarts-line',
      component: () =>
        import(/* webpackChunkName: "echarts" */ '@/views/echarts/line'),
      meta: {
        title: '折线'
      }
    }
  ]
}
