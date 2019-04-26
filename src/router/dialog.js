import Layout from './../views/layout'
const Index = () => import(/* webpackChunkName: "coding" */ './../views/dialog')
const Index1 = () => import(/* webpackChunkName: "coding" */ './../views/dialog/index1')

export default [
  {
    path: '/dialog',
    name: 'Dialog',
    component: Layout,
    meta: {
      title: '弹窗'
    },
    children: [
      {
        path: 'index',
        name: '/dialog/index',
        component: Index,
        meta: {
          tag: '/dialog',
          title: '弹窗',
          affix: false
        }
      },
      {
        path: 'index1',
        name: '/dialog/index1',
        component: Index1,
        meta: {
          tag: '/dialog',
          title: '弹窗1',
          affix: false
        }
      }
    ]
  }
]
