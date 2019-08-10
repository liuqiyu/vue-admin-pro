import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "dialog" */ './../views/dialog')

export default {
  path: '/dialog',
  name: 'Dialog',
  component: Layout,
  children: [
    {
      path: 'index',
      name: '/dialog/index',
      component: Index,
      meta: {
        icon: 'icon-danchuceng',
        tag: '/dialog',
        title: '弹窗',
        affix: false
      }
    }
  ]
}
