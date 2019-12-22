import Layout from './../views/layout'

export default {
  path: '/form',
<<<<<<< HEAD
  component: Layout,
  showRoot: false, // will show root menu
  meta: {
    title: 'Form'
  },
  children: [{
    path: 'index',
    name: 'form',
    component: () =>
      import(/* webpackChunkName: "form" */ './../views/form/index'),
    meta: {
      icon: 'icon-shifouyunxuweiwanchengpandianrenwukaidan',
      title: 'Form'
=======
  name: 'form',
  showRoot: false, // will show root menu
  meta: {
    icon: 'icon-xitong',
    tag: '/table/index',
    title: '系统管理'
  },
  component: Layout,
  children: [{
    path: 'index',
    name: '/form/index',
    component: () =>
      import(/* webpackChunkName: "config" */ './../views/form'),
    meta: {
      name: '/form/index',
      title: '表单',
      affix: false
>>>>>>> feat: add from create
    }
  }]
}
