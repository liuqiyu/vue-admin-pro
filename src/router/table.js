import Layout from './../views/layout'
const Default = () =>
  import(/* webpackChunkName: "table" */ './../views/table/default')
const CustomHeader = () =>
  import(/* webpackChunkName: "table" */ './../views/table/custom-header')

export default [
  {
    path: '/table',
    name: 'Table',
    meta: {
      icon: 'icon-biaoge',
      tag: '/table/index',
      title: '表格',
      notLink: true
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
      },
      {
        path: 'custom-header',
        name: '/table/custom-header',
        component: CustomHeader,
        meta: {
          tag: '/table',
          title: '自定义表头',
          affix: false
        }
      }
    ]
  }
]
