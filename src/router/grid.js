import Layout from '@/views/layout'

export default {
  path: '/style',
  component: Layout,
  showRoot: true, // will show root menu
  meta: {
    icon: 'icon-chart',
    title: '样式库'
  },
  children: [
    {
      path: 'map',
      name: 'echarts-map',
      component: () =>
        import(/* webpackChunkName: "echarts" */ '@/views/style/demo1'),
      meta: {
        title: '案例1'
      }
    }
  ]
}
