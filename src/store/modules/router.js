import { asyncRoutes, constantRoutes } from '@/router'
const router = {
  namespaced: true,
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES (state, routes) {
      state.addRoutes = routes
      state.routes = [...constantRoutes, ...routes]
    }
  },
  actions: {
    generateRoutes ({ commit }, menuAuth) {
      return new Promise(resolve => {
        let accessedRoutes = filterAsyncRoutes(asyncRoutes, menuAuth)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}

function filterAsyncRoutes (routes, menuAuth) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(menuAuth, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menuAuth)
      }
      res.push(tmp)
    }
  })

  return res
}

function hasPermission (menuAuth, route) {
  if (route.meta && route.meta.auth) {
    return menuAuth.some(auth => route.meta.auth.includes(auth))
  } else {
    return true
  }
}

export default router
