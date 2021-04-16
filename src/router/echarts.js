import Layout from '@/views/layout'

export default {
  path: '/grid',
  component: Layout,
  showRoot: false, // will show root menu
  meta: {
    icon: 'icon-chart',
    title: '图表'
  },
  children: [
    {
      path: 'grid',
      name: 'grid',
      component: () =>
        import(/* webpackChunkName: "echarts" */ '@/views/grid'),
      meta: {
        title: '布局'
      }
    }
  ]
}
