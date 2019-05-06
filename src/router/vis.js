import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "coding" */ './../views/vis')

export default [
  {
    path: '/vis',
    name: 'Vis',
    component: Layout,
    meta: {
      title: 'vis'
    },
    children: [
      {
        path: 'index',
        name: '/vis/index',
        component: Index,
        meta: {
          tag: '/vis',
          title: 'vis',
          affix: false
        }
      }
    ]
  }
]
