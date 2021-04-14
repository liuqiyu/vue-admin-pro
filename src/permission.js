import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from './store'
import router from './router'
import getPageTitle from '@/utils/get-page-title'

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  let token = sessionStorage.getItem('token')
  if (token) {
    if (to.path === '/login') {
      // 重定向
      next({ path: '/' })
    } else {
      const hasAuth = store.state.user.hasAuth
      if (hasAuth) {
        next()
      } else {
        // 获取菜单权限
        let role = store.state.user.role
        const menuAuth = await store.dispatch('user/getMenuAuth', role)
        const accessRoutes = await store.dispatch('router/generateRoutes', menuAuth)
        router.addRoutes(accessRoutes)
        next({ ...to })
      }
    }
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
