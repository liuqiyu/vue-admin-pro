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
      path: 'demo1',
      name: 'style-demo1',
      component: () =>
        import(/* webpackChunkName: "style-demo1" */ '@/views/style/demo1'),
      meta: {
        title: '案例1'
      }
    }
  ]
}
