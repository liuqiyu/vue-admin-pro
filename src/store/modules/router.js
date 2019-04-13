const router = {
  state: {
    mainNav: [],
    chooseRouter: []
  },
  getters: {
    mainNav: state => {
      const arr = []
      state.mainNav.forEach((item) => {
        arr.push({
          name: item.meta.name,
          path: item.path,
          dropMenu: item.meta.dropMenu
        })
      })
      return arr
    }
  },
  mutations: {
    SET_ROUTER (state, route) {
      state.mainNav = route
    },
    CHOOSE_ROUTER (state) {
      console.log(state.mainNav)
      state.chooseRouter = state.mainNav
    }
  },
  actions: {

  }
}

export default router
