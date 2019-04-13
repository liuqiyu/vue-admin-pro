import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "life" */ './../views/life')
const Add = () => import(/* webpackChunkName: "life" */ './../views/life/add')

export default [
  {
    path: '/life',
    name: 'life',
    meta: {
      name: '生活',
      dropMenu: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        component: Index,
        meta: {
          tag: '/coding/index',
          title: '编程-首页'
        }
      },
      {
        path: 'add',
        component: Add,
        meta: {
          tag: '/coding/index',
          title: '编程-新增'
        }
      }
    ]
  }
]
