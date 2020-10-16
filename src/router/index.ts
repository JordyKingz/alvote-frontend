import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Signup from '../views/signup/Signup.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Signup',
    component: Signup
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
