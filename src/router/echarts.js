import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "echarts" */ './../views/echarts')
const Add = () => import(/* webpackChunkName: "echarts" */ '../views/echarts/add')
const Topo1 = () => import(/* webpackChunkName: "echarts" */ '../views/echarts/topo1')
const Topo2 = () => import(/* webpackChunkName: "echarts" */ '../views/echarts/topo2')

export default [
  {
    path: '/echarts',
    name: 'echarts',
    component: Layout,
    meta: {
      title: '地图'
    },
    children: [
      {
        path: 'index',
        name: '/echarts/index',
        component: Index,
        meta: {
          tag: '/echarts/index',
          title: '图表1'
        }
      },
      {
        path: 'add',
        name: '/echarts/add',
        component: Add,
        meta: {
          tag: '/echarts/index',
          title: '图表2'
        }
      },
      {
        path: 'topo1',
        name: '/echarts/topo1',
        component: Topo1,
        meta: {
          tag: '/echarts/index',
          title: '拓扑图1'
        }
      },
      {
        path: 'topo2',
        name: '/echarts/topo2',
        component: Topo2,
        meta: {
          tag: '/echarts/index',
          title: '拓扑图2'
        }
      }
    ]
  }
]
