const router = {
  state: {
    route: []
  },
  getters: {
    route: state => {
      const arr = []
      state.route.forEach((item) => {
        arr.push({
          name: item.meta.name
        })
      })
      return arr
    }
  },
  mutations: {
    SET_ROUTER (state, route) {
      state.route = route
    }
  },
  actions: {

  }
}

export default router
