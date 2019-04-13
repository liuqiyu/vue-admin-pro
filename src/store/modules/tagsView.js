const tagsView = {
  state: {
    visitedViews: [],
    cacheViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS (state, view) {
      console.log(state.visitedViews)
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push(view)
    },
    ADD_CACHED_VIEWS (state, view) {
      state.cacheViews = view
    }
  },
  actions: {
    addView ({ dispatch }, view) {
      dispatch('addVisitedViews', view)
      dispatch('addCachedViews', view)
    },
    addVisitedViews ({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    addCachedViews ({ commit }, view) {
      commit('ADD_CACHED_VIEWS', view)
    }
  }
}

export default tagsView
