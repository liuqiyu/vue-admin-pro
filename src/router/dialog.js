import Layout from './../views/layout'

export default {
  path: '/dialog',
  name: 'Dialog',
  component: Layout,
  children: [{
    path: 'index',
    name: '/dialog/index',
    component: () => import(/* webpackChunkName: "dialog" */ './../views/dialog'),
    meta: {
      icon: 'icon-danchuceng',
      tag: '/dialog',
      title: '弹窗',
      affix: false
    }
  }]
}
