import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "coding" */ './../views/coding')
const Add = () => import(/* webpackChunkName: "coding" */ '../views/coding/add')
const Table = () => import(/* webpackChunkName: "coding" */ '../views/coding/table.vue')

export default [
  {
    path: '/coding',
    name: 'Coding',
    component: Layout,
    meta: {
      title: '编程'
    },
    children: [
      {
        path: 'index',
        name: '/coding/index',
        component: Index,
        meta: {
          tag: '/coding',
          title: '列表',
          affix: false
        }
      },
      {
        path: 'pane',
        name: '/coding/pane',
        component: Add,
        meta: {
          tag: '/coding',
          title: '布局'
        }
      },
      {
        path: 'table',
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
