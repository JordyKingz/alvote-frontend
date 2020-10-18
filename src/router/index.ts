import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Signup from '../views/association/auth/Signup.vue'
import Signin from '../views/association/auth/Signin.vue'
import Confirmation from '../views/association/auth/ConfirmAccount.vue'
import Dashboard from '../views/association/cp/Dashboard.vue'
import Rooms from '../views/association/cp/Rooms.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'landing',
    redirect: { name: 'signin'}
  },
  {
    path: '/sign-up',
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
  {
    path: '/cp/rooms',
    name: 'association.rooms',
    component: Rooms
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
