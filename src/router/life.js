import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "coding" */ './../views/life')
const Add = () => import(/* webpackChunkName: "coding" */ '../views/life/add')

export default [
  {
    path: '/life',
    name: 'life',
    meta: {
      name: '生活'
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
