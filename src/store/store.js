import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const browser = require('webextension-polyfill')

export default new Vuex.Store({
  state: {
    ws: []
  },
  mutations: {
    'LOAD_WS' (state, allWS) {
      state.ws = allWS
    },
    'ADD_WS' (state, ws) {
      state.ws = [...state.ws, ...ws]
    }
  },
  actions: {
    addWS: ({ commit }, objWS) => {
      const ws = JSON.stringify(objWS)
      browser.storage.local.set({ ws }).then(() => { // result returns undefined
        console.log('addWS/commit: ', ws)
        commit('ADD_WS', ws)
      })
    },
    loadWS: ({ commit }) => {
      browser.storage.local.get('ws').then(({ ws }) => {
        const allWS = JSON.parse(ws)
        console.log('loadWS/result: ', allWS)
        commit('LOAD_WS', allWS)
      })
    }
  },
  getters: {
    allWS: state => state.ws
  }
})
