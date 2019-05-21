import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "g6" */ './../views/g6')

export default [
  {
    path: '/g6',
    name: 'G6',
    component: Layout,
    meta: {
      title: 'g6'
    },
    children: [
      {
        path: 'index',
        name: '/g6/index',
        component: Index,
        meta: {
          tag: '/g6',
          title: '首页',
          affix: false
        }
      }
    ]
  }
]
