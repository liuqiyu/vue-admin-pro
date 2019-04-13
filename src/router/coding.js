import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "coding" */ './../views/coding')
const Add = () => import(/* webpackChunkName: "coding" */ '../views/coding/add')
const Table = () => import(/* webpackChunkName: "coding" */ '../views/coding/table.vue')

export default [
  {
    path: '/coding',
    name: 'coding',
    meta: {
      name: '编程',
      dropMenu: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '/coding/index',
        component: Index,
        meta: {
          tag: '/coding',
          title: '编程-首页'
        }
      },
      {
        path: 'add',
        name: '/coding/add',
        component: Add,
        meta: {
          tag: '/coding',
          title: '编程-新增'
        }
      },
      {
        path: 'table',
        name: '/coding/table',
        component: Table,
        meta: {
          tag: '/coding',
          title: '编程-列表'
        }
      }
    ]
  }
]
