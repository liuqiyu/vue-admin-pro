import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "g6" */ './../views/upload')

export default [
  {
    path: '/upload',
    name: 'upload',
    component: Layout,
    meta: {
      title: 'upload'
    },
    children: [
      {
        path: 'index',
        name: '/upload/index',
        component: Index,
        meta: {
          tag: '/upload',
          title: '首页',
          affix: false
        }
      }
    ]
  }
]
