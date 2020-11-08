import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    localService: 'http://localhost:8000/api/v1',
    prodService: 'https://alvote.nl/api/v1',

    pusherKey: '71a1c5781063558cd5ad',
    room: {},
    roomJoined: false,
  },
  getters: {
    serviceUrl: state => {
      return state.localService
    },
    pusherKey: state => {
      return state.pusherKey
    },
    room: state => {
      return state.room
    },
    roomJoined: state => {
      return state.roomJoined
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
