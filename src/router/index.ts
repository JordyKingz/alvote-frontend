import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Signup from '../views/association/auth/Signup.vue'
import Signin from '../views/association/auth/Signin.vue'
import Confirmation from '../views/association/auth/ConfirmAccount.vue'
import Dashboard from '../views/association/cp/Dashboard.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'signup',
    component: Signup
  },
  {
    path: '/confirm/account/:activationToken',
    name: 'account.cofirmation',
    component: Confirmation
  },
  {
    path: '/sign-in',
    name: 'signin',
    component: Signin
  },
  {
    path: '/cp/dashboard',
    name: 'association.dashboard',
    component: Dashboard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
