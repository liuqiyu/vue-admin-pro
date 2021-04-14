import Vue from 'vue'
import Vuex from 'vuex'
import router from './modules/router'
import tagsView from './modules/tagsView'
import user from './modules/user'
import roles from './modules/roles'
import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    router,
    tagsView,
    user,
    roles,
    settings
  },
  state: {
    isCollapse: false
  },
  getters: {
    isCollapse: state => state.isCollapse,
    cachedViews: state => state.tagsView.cachedViews,
    menuRoutes: state => state.router.routes,
    roles: state => state.roles.roles
  },
  mutations: {
    IS_COLLAPSE (state) {
      document.querySelector('.smart-layout').classList.toggle('hideMenu')
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
})
