import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userIdState: null,
    usernameState: null,
    isAdminState: false
  },
  mutations: {
    LOGIN_SUCCESS (state, response) {
      state.userIdState = response.userId
      state.usernameState = response.username
      state.isAdminState = response.isAdmin
    }
  },
  actions: {},
  modules: {}
})
