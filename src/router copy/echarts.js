import Layout from './../views/layout'

export default {
  path: '/echarts',
  component: Layout,
  showRoot: false, // will show root menu
  meta: {
    title: '图表'
  },
  children: [{
    path: 'index',
    name: 'echarts',
    component: () =>
      import(/* webpackChunkName: "echarts" */ './../views/echarts/index'),
    meta: {
      icon: 'icon-ditumap29',
      title: '图表'
    }
  }]
}
