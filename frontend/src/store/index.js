import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    username: null,
    isAdmin: false,
    token: null
  },
  mutations: {
    LOGIN_SUCCESS (state, response) {
      state.userId = response.userId
      state.isAdmin = response.isAdmin
      state.token = response.token
    }
  },
  actions: {},
  modules: {}
})
