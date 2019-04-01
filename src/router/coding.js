import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "coding" */ './../views/coding')
const Add = () => import(/* webpackChunkName: "coding" */ '../views/coding/add')

export default [
  {
    path: '/coding',
    name: 'coding',
    meta: {
      name: '编程'
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
