import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "echarts" */ './../views/echarts')
const Add = () => import(/* webpackChunkName: "echarts" */ '../views/echarts/add')

export default [
  {
    path: '/',
    name: 'echarts',
    meta: {
      title: '地图',
      dropMenu: true
    },
    component: Layout,
    children: [
      {
        path: 'echarts/index',
        component: Index,
        meta: {
          tag: '/echarts/index',
          title: '首页'
        }
      },
      {
        path: 'echarts/add',
        component: Add,
        meta: {
          tag: '/echarts/index',
          title: '新增'
        }
      }
    ]
  }
]
