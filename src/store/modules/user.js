import http from '@/utils/http'

const user = {
  namespaced: true,
  state: {
    token: sessionStorage.getItem('token'),
    username: sessionStorage.getItem('username'),
    role: sessionStorage.getItem('role'),
    menuAuth: JSON.parse(sessionStorage.getItem('menuAuth')) || [],
    hasAuth: false
  },
  getters: {},
  mutations: {
    SET_TOKEN (state, value) {
      state.token = value
    },
    SET_USERNAME (state, value) {
      state.username = value
    },
    SET_ROLE (state, value) {
      state.role = value
    },
    SEET_MENU_AUTH (state, value) {
      state.menuAuth = value
    },
    SEET_HAS_AUTH (state, value) {
      state.hasAuth = value
    }
  },
  actions: {
    // 登录
    login ({ commit }, formData) {
      return new Promise((resolve, reject) => {
        http.post('/login', formData).then(res => {
          const { data } = res
          sessionStorage.setItem('token', data.token)
          sessionStorage.setItem('username', data.userInfo.username)
          sessionStorage.setItem('role', data.userInfo.role)
          commit('SET_TOKEN', data.token)
          commit('SET_USERNAME', data.userInfo.username)
          commit('SET_ROLE', data.userInfo.role)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 注销
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        http.post('/logout').then(res => {
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('username')
          sessionStorage.removeItem('role')
          commit('SET_TOKEN', '')
          commit('SET_USERNAME', '')
          commit('SET_ROLE', '')
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取菜单权限
    getMenuAuth ({ commit }, role) {
      return new Promise((resolve, reject) => {
        http.post('/menuAuth', { role }).then(res => {
          const { data } = res
          sessionStorage.setItem('hasAuth', true)
          sessionStorage.setItem('menuAuth', JSON.stringify(data))
          commit('SEET_HAS_AUTH', true)
          commit('SEET_MENU_AUTH', data)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user
