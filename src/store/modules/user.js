import http from './../../utils/http'
const user = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    login ({ commit }, formData) {
      return new Promise((resolve, reject) => {
        http.post('/users/login', formData).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user
