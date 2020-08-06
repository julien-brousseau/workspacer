import Vue from 'vue'
import Vuex from 'vuex'

import { initJSS } from '../db/jss_db'
import { Workspace } from '../db/services/Workspace'

// Un-comment this line to enable browser testing in regular Vue app
// import { Browser, Workspace } from '../db/browser'
// const browser = Browser

Vue.use(Vuex)

const browser = require('webextension-polyfill')

export default new Vuex.Store({
  state: {
    ws: null,
    addingWS: false,
    selectedId: null,
    editingWS: false
    // editingTab: null
  },
  mutations: {

    'INIT_WS' (state, initialWSData) {
      state.ws = initialWSData
    },

    'CREATE_WS' (state, newWSData) {
      state.ws.unshift(newWSData)
    },

    'SET_WS_TABS' (state, updatedWSData) {
      const ws = state.ws.find(w => w.id === updatedWSData.id)
      ws.tabs = updatedWSData.tabs
    },

    'SET_ADDING_WS' (state, isVisible) {
      state.addingWS = isVisible
    },

    'SET_SELECTED_WS' (state, wsId) {
      state.selectedId = wsId
    },

    'SET_EDITING_WS' (state, isEditing) {
      state.editingWS = isEditing
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
          commit('CREATE_WS', ws[0])
          commit('SET_ADDING_WS', false)
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
      const { title, url } = tab[0]
      const id = Date.now()

      // Push current tab to the workspace tab list
      const ws = getters.allWS.find(ws => ws.id === wsId)
      const tabs = [...ws.tabs, { id, title, url }]
      const newWS = { ...ws, tabs }

      // Update DB
      new Workspace().updateWS(newWS)
        .then(rowsUpdated => {
          if (rowsUpdated === 1) commit('SET_WS_TABS', newWS)
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

    // TODO: divide between show and global home button
    // Show/hide the New WS form
    toggleAddingWS: ({ commit, state }, addingWS = null) => {
      commit('SET_SELECTED_WS', null)
      commit('SET_EDITING_WS', null)
      commit('SET_ADDING_WS', addingWS === null ? !state.addingWS : addingWS)
    },

    // Show/hide the Edit WS form
    // toggleEditingTab: ({ commit, state }, tabId = null) => {
    //   commit('SET_EDITING_TAB', tabId === null ? !state.editingTab : tabId)
    // },

    // Set selected WS id
    toggleSelectedWS: ({ commit, state }, id = null) => {
      commit('SET_SELECTED_WS', id)
    },

    // Show/hide the Edit WS form
    toggleEditingWS: ({ commit, state }, editingWS = null) => {
      const e = editingWS === null ? !state.editingWS : editingWS
      console.log('Editing :>> ', e)
      commit('SET_EDITING_WS', e)
    }

  },
  getters: {
    allWS: state => state.ws,
    addingWS: state => state.addingWS,
    selectedWS: state => state.selectedId,
    selectedWSData: state => state.ws.find(ws => ws.id === state.selectedId),
    editingWS: state => state.editingWS
    // editingTab: state => state.editingTab
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

// Temporary fix until tabs are managed by a separate jsStore table
// function fixTabIds (tabs) {
//   return tabs.map(t => {
//     if (!t.id) t.id = Date.now()
//     console.log('t :>> ', t)
//     return t
//   })
// }
