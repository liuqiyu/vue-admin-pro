import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "life" */ './../views/life')
const Add = () => import(/* webpackChunkName: "life" */ './../views/life/add')

export default [
  {
    path: '/',
    name: 'life',
    meta: {
      title: '生活',
      dropMenu: true
    },
    component: Layout,
    children: [
      {
        path: 'life/index',
        component: Index,
        meta: {
          tag: '/coding/index',
          title: '首页'
        }
      },
      {
        path: 'life/add',
        component: Add,
        meta: {
          tag: '/coding/index',
          title: '新增'
        }
      }
    ]
  }
]
