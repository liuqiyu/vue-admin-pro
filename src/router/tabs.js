import Layout from '@/views/layout'

export default {
  path: '/tabs',
  component: Layout,
  showRoot: false, // will show root menu
  children: [{
    path: 'index',
    name: 'tabs',
    component: () =>
      import(/* webpackChunkName: "tabs" */ '@/views/tabs/index'),
    meta: {
      icon: 'icon-tabs',
      title: 'Tabs'
    }
  }]
}
