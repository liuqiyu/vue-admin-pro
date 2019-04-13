import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "echarts" */ './../views/echarts')
const Add = () => import(/* webpackChunkName: "echarts" */ '../views/echarts/add')

export default [
  {
    path: '/echarts',
    name: 'echarts',
    meta: {
      name: '地图',
      dropMenu: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        component: Index,
        meta: {
          tag: '/echarts/index',
          title: '地图-首页'
        }
      },
      {
        path: 'add',
        component: Add,
        meta: {
          tag: '/echarts/index',
          title: '地图-新增'
        }
      }
    ]
  }
]
