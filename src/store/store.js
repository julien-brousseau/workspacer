import Vue from 'vue'
import Vuex from 'vuex'

import { initJSS } from '../db/jss_db'
import { Workspace } from '../db/services/Workspace'

// Un-comment this line to enable browser testing in regular Vue app
// import Browser from '../db/browser'
const Browser = null

Vue.use(Vuex)

const browser = Browser || require('webextension-polyfill')

export default new Vuex.Store({
  state: {
    ws: null,
    newWS: null,
    selectedWS: null,
    addingWS: null,
    showTabs: null
  },
  mutations: {

    'INIT_WS' (state, initialWSData) {
      state.ws = initialWSData
    },

    'ADD_WS' (state, newWSData) {
      state.ws.unshift(newWSData)
    },

    'UPDATE_WS_TABS' (state, updatedWSData) {
      const ws = state.ws.find(w => w.id === updatedWSData.id)
      ws.tabs = updatedWSData.tabs
    },

    'UPDATE_ADDING_WS' (state, visible) {
      state.addingWS = visible
    },

    'UPDATE_SHOW_TABS' (state, visible) {
      state.showTabs = visible
    },

    'UPDATE_SELECTED_WS' (state, selected) {
      state.selectedWS = selected
    }

  },
  actions: {

    // Init indexDB and load workspaces
    initWS: async ({ dispatch, commit }) => {
      return initJSS()
        .then(() => dispatch('loadWS'))
        .then(ws => commit('INIT_WS', ws))
        .catch(e => console.log('Error > initWS :>> ', e))
    },

    // Create a new Workspace object
    createWS: async ({ commit, dispatch }, ws) => {
      new Workspace().createWS(ws)
        .then(ws => {
          commit('ADD_WS', ws[0])
          commit('UPDATE_ADDING_WS', false)
        })
        .then(() => dispatch('loadWS'))
        .catch(e => console.log('Error > createWS :>> ', e))
    },

    // Query browser to get all current window's tabs
    getAllTabsFromWindow: async () => {
      return browser.tabs.query({ currentWindow: true })
        .then(tabs => tabs.map(({ id, title, url }) => { return { id, title, url } }))
        .catch(e => console.log('Error > getAllTabsFromWindow :>> ', e))
    },

    // Save the current tab into the selected Workspace
    addTabToWS: async ({ getters, commit }, wsId) => {
      // Fetch current tab filtered properties
      const tab = await browser.tabs.query({ currentWindow: true, active: true })
      const { id, title, url } = tab[0]

      // Push current tab to the workspace tab list
      const ws = getters.allWS.find(ws => ws.id === wsId)
      const newWS = { ...ws, tabs: [...ws.tabs, { id, title, url }] }

      // Update DB
      new Workspace().updateWS(newWS)
        .then(rowsUpdated => {
          if (rowsUpdated === 1) commit('UPDATE_WS_TABS', newWS)
          else console.log(rowsUpdated + ' rows were updated')
        })
        .catch(e => console.log('Error > addTabToWS :>> ', e))
    },

    // Fetch the indexDB-stored workspace database
    loadWS: async () => {
      return new Workspace().getWS()
        .then(ws => ws)
        .catch(e => console.log('Error > loadWS :>> ', e))
    },

    // Clear the workspace database
    clearWS: async ({ commit }) => {
      await new Workspace().clearWS()
      commit('INIT_WS', [])
    },

    // Show/hide the New WS form
    toggleAddingWS: ({ commit, state }, addingWS) => {
      commit('UPDATE_ADDING_WS', typeof addingWS === 'boolean' ? addingWS : !state.addingWS)
    },

    // Show/hide the tab list in create form (from current window)
    toggleShowTabs: ({ commit, state }, showTabs) => {
      commit('UPDATE_SHOW_TABS', typeof showTabs === 'boolean' ? showTabs : !state.showTabs)
    },

    // Set selected WS id
    toggleSelectedWS: ({ commit, state }, id = null) => {
      commit('UPDATE_SELECTED_WS', (!id || id === state.selectedWS) ? null : id)
    }

  },
  getters: {
    allWS: state => state.ws,
    newWS: state => state.newWS,
    addingWS: state => state.addingWS,
    showTabs: state => state.showTabs,
    selectedWS: state => state.selectedWS
  }
})

function sortTabs (tabs) {
  return tabs.sort((tab1, tab2) => {
    return tab1.index === tab2.index ? 0 : tab1.index > tab2.index ? 1 : -1
  })
}

function printObj (msg, o) {
  console.log('PRINTING >> ', msg)
  Object.keys(o).map(ws => console.log(ws))
}
