const router = {
  state: {
    mainNav: [],
    chooseRouter: []
  },
  getters: {
    mainNav: state => state.mainNav
  },
  mutations: {
    SET_ROUTER (state, route) {
      const arr = []
      route.forEach((item) => {
        if (item.children && item.children.length <= 1) {
          arr.push({
            title: item.meta.title,
            path: `${item.path}${item.children[0].path}`
          })
        } else {
          const arrChild = []
          item.children.forEach((cell) => {
            arrChild.push({
              title: cell.meta.title,
              path: `${item.path}${cell.path}`
            })
          })
          arr.push({
            title: item.meta.title,
            children: arrChild
          })
        }
      })
      state.mainNav = arr
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
