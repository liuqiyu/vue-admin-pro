const Index = () => import(/* webpackChunkName: "coding" */ './../views/coding')
const Add = () => import(/* webpackChunkName: "coding" */ '../views/coding/add')

export default [
  {
    path: 'coding/index',
    component: Index,
    meta: {
      tag: '/coding/index',
      title: '编程-首页'
    }
  },
  {
    path: 'coding/add',
    component: Add,
    meta: {
      tag: '/coding/index',
      title: '编程-新增'
    }
  }
]
