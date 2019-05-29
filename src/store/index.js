import Vue from 'vue'
import Vuex from 'vuex'
import router from './modules/router'
import tagsView from './modules/tagsView'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    router,
    tagsView,
    user
  },
  state: {
    resolutionRatio: (document.documentElement.clientWidth / 1920)
  },
  getters: {
    name: state => state.name
  },
  mutations: {

  },
  actions: {

  }
})
