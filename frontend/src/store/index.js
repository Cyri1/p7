import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    username: null,
    isAdmin: false
  },
  mutations: {
    LOGIN_SUCCESS (state, response) {
      state.userId = response.userId
      state.username = response.username
      state.isAdmin = response.isAdmin
    }
  },
  actions: {},
  modules: {}
})
