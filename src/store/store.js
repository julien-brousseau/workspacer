import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const browser = require('webextension-polyfill')

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

    // Initially load storage WS
    initWS: async ({ dispatch, commit }) => {
      dispatch('loadWS')
        .then(ws => commit('UPDATE_ALL_WS', ws))
        .catch(e => console.log('Error: :>> ', e))
    },

    // Create a new Workspace object
    addWS: ({ dispatch, getters }, { name }) => {
      const ws = { ...getters.allWS, [name]: [] }
      dispatch('saveWS', ws)
    },

    // Create a new tab in the selected Workspace
    addTabToWS: async ({ dispatch, getters }, wsName) => {
      browser.tabs.query({ currentWindow: true, active: true })
        .then(currentTab => currentTab[0])
        .then(({ id, title, url }) => {
          const ws = { ...getters.allWS }
          const tab = { id, title, url }
          ws[wsName].push(tab)
          dispatch('saveWS', ws)
        })
        .catch(e => console.log('Error: :>> ', e))
    },

    // Save the stringyfied ws object to storage, and commit the returned storage to state
    saveWS: async ({ dispatch, commit }, ws) => {
      const jsonWS = JSON.stringify(ws)
      await browser.storage.local.set({ ws: jsonWS })
      dispatch('loadWS')
        .then(storedWS => commit('UPDATE_ALL_WS', storedWS))
        .catch(e => console.log('Error: :>> ', e))
    },

    // Returns the JSON parsed content of local storage {ws} variable
    loadWS: async () => {
      return browser.storage.local.get('ws')
        .then(({ ws }) => JSON.parse(ws))
        .catch(e => console.log('Error: :>> ', e))
    },

    // Reset the ws storage with empty object
    clearWS: ({ dispatch }) => {
      dispatch('saveWS', {})
    },

    // Show/hide the New WS form
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
