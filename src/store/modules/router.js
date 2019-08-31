const router = {
  namespaced: true,
  state: {
    routes: []
  },
  mutations: {
    SET_ROUTER (state, routes) {
      console.log(routes)
      state.routes = routes
    }
  },
  actions: {}
}

export default router
