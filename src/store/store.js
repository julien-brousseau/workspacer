import Vue from 'vue'
import Vuex from 'vuex'

import { initJSS } from '../db/jss_db'
import { Workspace } from '../db/services/Workspace'
import { Tab } from '../db/services/Tab'

// Un-comment this line to enable browser testing in regular Vue app
// import { Browser, Workspace } from '../db/browser'
// const browser = Browser

Vue.use(Vuex)

const browser = require('webextension-polyfill')

export default new Vuex.Store({
  state: {
    ws: null,
    tabs: null,
    addingWS: false,
    selectedId: null,
    editingWS: false
  },
  mutations: {

    'INIT_WS' (state, initialWSData) {
      state.ws = initialWSData
    },

    'INIT_TABS' (state, initialTabsData) {
      state.tabs = initialTabsData
    },

    'CREATE_WS' (state, newWSData) {
      state.ws.unshift(newWSData)
    },

    'CREATE_TAB' (state, createdTab) {
      state.tabs = [...state.tabs, createdTab]
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

    // Init indexDB and load workspaces/tabs
    initWS: async ({ dispatch, commit }) => {
      return initJSS()
        .then(() => dispatch('loadWS'))
        .then(ws => commit('INIT_WS', ws))
        .then(() => dispatch('loadTabs'))
        .then(tabs => commit('INIT_TABS', tabs))
        .catch(e => console.log('Error > initWS :>> ', e))
    },

    // Fetch the indexDB-stored workspace database
    loadWS: async () => {
      return new Workspace().getWS()
        .then(ws => ws)
        .catch(e => console.log('Error > loadWS :>> ', e))
    },

    // Fetch the indexDB-stored workspace database
    loadTabs: async () => {
      return new Tab().getAllTabs()
        .then(tabs => tabs)
        .catch(e => console.log('Error > loadTabs :>> ', e))
    },

    // Clear the workspace database
    clearWS: async ({ commit }) => {
      await new Workspace().clearWS()
      await new Tab().clearTabs()
      commit('INIT_WS', [])
    },

    // Create a new Workspace object
    createWS: async ({ commit, dispatch }, { ws, tabs }) => {
      new Workspace().createWS(ws)
        .then(ws => commit('CREATE_WS', ws[0]))
        .then(() => dispatch('loadWS'))
        .catch(e => console.log('Error > createWS :>> ', e))
    },

    // Save the current tab into the selected Workspace
    createTab: async ({ commit }, wsId) => {
      const tab = await browser.tabs.query({ currentWindow: true, active: true })
      const { title, url } = tab[0]
      new Tab().createTab({ wsId, title, url })
        .then(tab => commit('CREATE_TAB', tab[0]))
        .catch(e => console.log('Error > addTabToWS :>> ', e))
    },

    // Query browser to get all current window's tabs
    getAllTabsFromWindow: async () => {
      return browser.tabs.query({ currentWindow: true })
        .then(tabs => tabs.map(({ id, title, url }) => { return { id, title, url } }))
        .catch(e => console.log('Error > getAllTabsFromWindow :>> ', e))
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
    toggleSelectedWS: ({ commit }, id = null) => {
      commit('SET_SELECTED_WS', id)
    },

    // Show/hide the Edit WS form
    toggleEditingWS: ({ commit, state }, editingWS = null) => {
      commit('SET_EDITING_WS', editingWS === null ? !state.editingWS : editingWS)
    }

  },
  getters: {
    allWS: state => state.ws,
    allTabs: state => state.tabs,
    addingWS: state => state.addingWS,
    selectedWS: state => state.selectedId,
    selectedWSData: state => state.ws.find(ws => ws.id === state.selectedId),
    editingWS: state => state.editingWS
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
