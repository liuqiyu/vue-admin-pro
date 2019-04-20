import Vue from 'vue'
import Vuex from 'vuex'
import router from './modules/router'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    router,
    tagsView
  },
  state: {
    name: '更改'
  },
  getters: {
    name: state => state.name
  },
  mutations: {

  },
  actions: {

  }
})
