import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "life" */ './../views/life')
const Add = () => import(/* webpackChunkName: "life" */ './../views/life/add')

export default [
  {
    path: '/life',
    name: 'life',
    component: Layout,
    meta: {
      title: '生活'
    },
    children: [
      {
        path: 'index',
        name: '/life/index',
        component: Index,
        meta: {
          tag: '/add/index',
          title: '生活1'
        }
      },
      {
        path: 'add',
        name: '/life/add',
        component: Add,
        meta: {
          tag: '/add/index',
          title: '生活2'
        }
      }
    ]
  }
]
