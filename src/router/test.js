import Layout from './../views/layout'
const Default = () =>
  import(/* webpackChunkName: "table" */ './../views/table/default')

export default [
  {
    path: '/table',
    name: 'Table',
    meta: {
      icon: 'icon-biaoge',
      tag: '/table/index',
      title: '测试'
    },
    component: Layout,
    children: [
      {
        path: 'default',
        name: '/table/default',
        component: Default,
        meta: {
          tag: '/table',
          title: '常规表格',
          affix: false
        }
      }
    ]
  }
]
