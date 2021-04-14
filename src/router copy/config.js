import Layout from './../views/layout'

export default {
  path: '/config',
  name: 'config',
  showRoot: true, // will show root menu
  meta: {
    icon: 'icon-xitong',
    title: '系统管理'
  },
  component: Layout,
  children: [{
    path: 'auth-menu',
    name: 'auth-menu',
    component: () =>
      import(/* webpackChunkName: "config" */ './../views/config/auth-menu'),
    meta: {
      title: '菜单控制'
    }
  }]
}
