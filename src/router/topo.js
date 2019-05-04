import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "coding" */ './../views/topo')

export default [
  {
    path: '/topo',
    name: 'Topo',
    component: Layout,
    meta: {
      title: '拓扑'
    },
    children: [
      {
        path: 'index',
        name: '/topo/index',
        component: Index,
        meta: {
          tag: '/topo',
          title: '拓扑',
          affix: false
        }
      }
    ]
  }
]
