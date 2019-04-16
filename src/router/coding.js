import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "coding" */ './../views/coding')
const Add = () => import(/* webpackChunkName: "coding" */ '../views/coding/add')
const Table = () => import(/* webpackChunkName: "coding" */ '../views/coding/table.vue')

export default [
  {
    path: '/',
    name: 'coding',
    meta: {
      title: '编程'
    },
    component: Layout,
    children: [
      {
        path: 'coding/index',
        name: '/coding/index',
        component: Index,
        meta: {
          tag: '/coding',
          title: '列表'
        }
      },
      {
        path: 'coding/pane',
        name: '/coding/pane',
        component: Add,
        meta: {
          tag: '/coding',
          title: '布局'
        }
      },
      {
        path: 'coding/table',
        name: '/coding/table',
        component: Table,
        meta: {
          tag: '/coding',
          title: '表格'
        }
      }
    ]
  }
]
