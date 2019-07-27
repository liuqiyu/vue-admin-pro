import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import { getSession } from '@/utils/auth'

router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(getSession())
  if (getSession()) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
  // ...
  NProgress.done()
})
