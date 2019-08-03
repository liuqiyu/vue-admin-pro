import http from './../../utils/http'
import { setSession, removeSession, getSession } from '@/utils/auth'

const user = {
  state: {
    sessionID: getSession(),
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
  },
  getters: {},
  mutations: {
    SET_SESSIONID (state, value) {
      state.sessionID = value
    },
    SEET_USERINFO (state, value) {
      state.userInfo = value
    }
  },
  actions: {
    login ({ commit }, formData) {
      return new Promise((resolve, reject) => {
        http
          .post('/login', formData)
          .then(res => {
            setSession(res.data.sessionID)
            sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
            commit('SET_SESSIONID', res.data.sessionID)
            commit('SEET_USERINFO', res.data.data)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        http
          .post('/logout')
          .then(res => {
            removeSession() // 清空session
            sessionStorage.removeItem('userInfo')
            commit('SET_SESSIONID', '')
            commit('SEET_USERINFO', {})
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default user
