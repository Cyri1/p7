import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons, VBPopoverPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import fr from 'vee-validate/dist/locale/fr.json'
import * as rules from 'vee-validate/dist/rules'

// VeeValidate
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
localize('fr', fr)

// VueBootstrap
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VBPopoverPlugin)

// Vue
export const bus = new Vue()

Vue.config.productionTip = true
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
