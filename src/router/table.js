import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "table" */ './../views/table')

export default [
  {
    path: '/table',
    name: 'Table',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '/table/index',
        component: Index,
        meta: {
          icon: 'icon-biaoge',
          tag: '/table',
          title: '表格',
          affix: false
        }
      }
    ]
  }
]
