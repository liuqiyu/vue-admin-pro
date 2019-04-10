import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "coding" */ './../views/coding')
const Add = () => import(/* webpackChunkName: "coding" */ '../views/coding/add')
const Table = () => import(/* webpackChunkName: "coding" */ '../views/coding/table.vue')

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
      },
      {
        path: 'table',
        component: Table,
        meta: {
          tag: '/coding/index',
          title: '编程-列表'
        }
      }
    ]
  }
]
