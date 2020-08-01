import Vue from 'vue'
import Vuex from 'vuex'

import { initJSS } from '../db/jss_db'
import { WorkspaceService } from '../db/services/Workspace'

// Un-comment this line to enable browser testing in regular Vue app
// import Browser from '../db/browser'
const Browser = null

Vue.use(Vuex)

const browser = Browser || require('webextension-polyfill')

export default new Vuex.Store({
  state: {
    WS: new WorkspaceService(),
    ws: null, // {},
    newWS: null, // {},
    selectedWS: null,
    addingWS: null,
    showTabs: null
  },
  mutations: {

    'INIT_WS' (state, ws) {
      state.ws = ws
    },
    'ADD_WS' (state, ws) {
      state.ws = ws
    },

    'UPDATE_NEW_WS' (state, ws) {
      state.newWS = ws
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
        .then(ws => { commit('INIT_WS', ws); return ws })
        .then(ws => console.log('Loaded ws :>> ', ws)) // temp
        .catch(e => console.log('Error > initWS :>> ', e)) // Global.isIndexedDbSupported = false
    },

    // Create a new Workspace object
    createWS: ({ dispatch, commit, state }, ws) => {
      state.WS.createWS(ws)
        // .then(storedWS => commit('UPDATE_ALL_WS', storedWS))
        .then(ws => console.log('Saved >> ', ws)) // commit('UPDATE_ALL_WS', storedWS))
        .catch(e => console.log('Error > saveWS :>> ', e))
      // const ws = { ...getters.allWS, [name]: sortTabs(tabs) }
      // dispatch('saveWS', ws)
      // commit('UPDATE_ADDING_WS', false)
    },

    //
    getAllTabsFromWindow: async () => {
      console.log('Getting tabs from current window')
      return await browser.tabs.query({ currentWindow: true })
    },

    // Create a new tab in the selected Workspace
    addTabToWS: async ({ dispatch, getters }, wsName) => {
      browser.tabs.query({ currentWindow: true, active: true })
        .then(currentTab => currentTab[0]) // TODO: Optimize?
        .then(ws => console.log('Current tab :>> ', ws))
      //    const ws = { ...getters.allWS }
      //    const tab = { id, title, url }
      //    ws[wsName].push(tab)
      //    dispatch('saveWS', ws)
        .catch(e => console.log('Error > addTabToWS :>> ', e))
    },

    // Save the stringyfied ws object to storage, and commit the returned storage to state
    saveWS: async ({ dispatch, commit, state }, ws) => {
    },

    // Returns the JSON parsed content of local storage {ws} variable
    loadWS: async ({ state }) => {
      return state.WS.getWS()
        .then(ws => ws)
        .catch(e => console.log('Error: :>> ', e))
    },

    // Reset the ws storage with empty object
    clearWS: async ({ state, commit }) => {
      await state.WS.clearWS()
      commit('UPDATE_WS', null)
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
