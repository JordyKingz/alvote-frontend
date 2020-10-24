import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    localService: 'http://localhost:8000/api/v1',
    prodService: 'https://alvote.nl/api/v1',
    room: {},
    roomJoined: false,
  },
  getters: {
    serviceUrl: state => {
      return state.localService
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
