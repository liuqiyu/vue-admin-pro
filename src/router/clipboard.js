import Layout from '@/views/layout'

export default {
  path: '/clipboard',
  meta: {
    icon: 'icon-jianqieban',
    title: 'clipboard'
  },
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'clipboard',
      component: () =>
        import(/* webpackChunkName: "clipboard" */ '@/views/clipboard/index'),
      meta: {
        title: '剪贴板'
      }
    }
  ]
}
