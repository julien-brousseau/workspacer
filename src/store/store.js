import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const browser = require('webextension-polyfill')
// const browser = {}
// browser.set = new Promise((resolve, reject) => {

// })

// const identities = await browser.contextualIdentities.query({})
// const identity = identities.filter(i => i.name === "Brousseau.tech")[0].cookieStoreId

// const data = {
//   ws: {
//     Coding: [
//       { title: 'Vue.js App', url: 'localhost:8080', pinned: false, index: 0, discarded: false },
//       { title: 'Firefox', url: 'firefox.com', pinned: false, index: 1, discarded: true },
//       { title: 'Github', url: 'github.com', pinned: false, index: 2, discarded: true }
//     ],
//     Personal: [
//       { title: 'Bank', url: 'tangerine.ca', pinned: false, index: 0, discarded: false },
//       { title: 'Search', url: 'google.ca', pinned: false, index: 1, discarded: false }
//     ]
//   } //, cookieStoreId: identity
// }

export default new Vuex.Store({
  state: {
    ws: {},
    addingWS: false
  },
  mutations: {

    'UPDATE_ALL_WS' (state, ws) {
      state.ws = ws
    },

    'TOGGLE_ADDING_WS' (state, visible) {
      state.addingWS = visible
    }

  },
  actions: {

    loadWS: async ({ commit }) => {
      browser.storage.local.get('ws')
        .then(({ ws }) => commit('UPDATE_ALL_WS', ws))
        .catch(e => console.log('e :>> ', e))
    },

    addWS: async ({ commit, getters }, { name }) => {
      const ws = { ...getters.allWS, [name]: [] }
      browser.storage.local.set({ ws }).then(() => {
        commit('UPDATE_ALL_WS', ws)
        commit('TOGGLE_ADDING_WS', false)
      })
    },

    addTabToWS: async ({ commit, getters }, wsName) => {
      console.log('ADD TAB :>> ', wsName)
      const ws = [...getters.allWS[wsName], { url: 'blop.com', id: 1 }]
      const blop = { ...getters.allWS, [wsName]: ws }
      browser.storage.local.set({ blop }).then(() => {
        commit('UPDATE_ALL_WS', blop)
        console.log('getters.allWS :>> ', getters.allWS)
      })
    },

    clearWS: async ({ commit }) => {
      await browser.storage.local.set({ ws: {} })
      const res = await browser.storage.local.get('ws')
      console.log('CLEARED, GET WS: ', res)
      commit('UPDATE_ALL_WS', {})
    },

    toggleAddingWS: ({ commit, state }) => {
      commit('TOGGLE_ADDING_WS', !state.addingWS)
    }

  },
  getters: {
    allWS: state => state.ws,
    addingWS: state => state.addingWS
  }
})

function printObj (msg, o) {
  console.log('PRINTING >> ', msg)
  Object.keys(o).map(ws => console.log(ws))
}
