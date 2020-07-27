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
      console.log('STATE >> ', state.ws)
    },

    'TOGGLE_ADDING_WS' (state, visible) {
      state.addingWS = visible
    }

  },
  actions: {

    // Initially load storage WS
    initWS: async ({ dispatch, commit }) => {
      const ws = await dispatch('loadWS')
      commit('UPDATE_ALL_WS', ws)
    },

    // Create a new Workspace object
    addWS: async ({ dispatch, getters }, { name }) => {
      const ws = { ...getters.allWS, [name]: [] }
      dispatch('saveWS', ws)
    },

    // Create a new tab in the selected Workspace
    addTabToWS: async ({ dispatch, getters }, wsName) => {
      const currentTab = await browser.tabs.query({ currentWindow: true, active: true })
      const { id, title, url } = currentTab[0]
      const ws = { ...getters.allWS }
      const tab = { id, title, url }
      ws[wsName].push(tab)
      dispatch('saveWS', ws)
    },

    // Save the stringyfied ws object to storage, and commit the returned storage to state
    saveWS: async ({ dispatch, commit }, ws) => {
      const jsonWS = JSON.stringify(ws)
      await browser.storage.local.set({ ws: jsonWS })
      const storedWS = await dispatch('loadWS')
      commit('UPDATE_ALL_WS', storedWS)
    },

    // Returns the JSON parsed content of local storage {ws} variable
    loadWS: async () => {
      return browser.storage.local.get('ws')
        .then(({ ws }) => {
          return JSON.parse(ws)
        })
        .catch(e => {
          return { e }
        })
    },

    // Reset the ws storage object
    clearWS: async ({ dispatch }) => {
      dispatch('saveWS', {})
    },

    //
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
