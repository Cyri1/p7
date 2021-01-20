import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Wall from '../views/Wall.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/wall',
  name: 'Wall',
  component: Wall
}]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
