import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
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
