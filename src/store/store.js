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

    'SET_WS' (state, wsData) {
      state.ws = wsData
      console.log('wsData :>> ', wsData)
    },

    'SET_TABS' (state, tabsData) {
      state.tabs = tabsData
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

        // Fetch all WS
        .then(() => dispatch('getAllWS'))
        .then(ws => commit('SET_WS', ws))

        // Fetch all tbas
        .then(() => dispatch('getAllTabs'))
        .then(tabs => commit('SET_TABS', tabs))

        .catch(e => console.log('Error > initWS :>> ', e))
    },

    // Clear the workspace database
    clearWS: async ({ commit }) => {
      await new Workspace().clearWS()
      await new Tab().clearTabs()
      commit('SET_WS', [])
      commit('SET_TABS', [])
    },

    // Create a new Workspace object
    createOrUpdateWS: async ({ commit, dispatch }, { ws, tabs }) => {
      return new Workspace()
        .createOrUpdateWS(ws)
        .then(([ws]) => dispatch('createTabs', tabs.map(t => { return { ...t, wsId: ws.id } })))
        .then(() => dispatch('getAllWS'))
        .then(ws => commit('SET_WS', ws))
        .then(() => null)
        .catch(e => { console.log('Error > createOrUpdateWS :>> ', e); return e })
    },

    // Save the current tab into the selected Workspace
    createTabs: async ({ dispatch, commit }, tabs) => {
      new Tab().createOrUpdateTab(tabs)
        .then(tab => tab)
        .then(() => dispatch('getAllTabs'))
        .then(tabs => commit('SET_TABS', tabs))
        .catch(e => console.log('Error > createTabs :>> ', e))
    },

    // GETTERS

    // Fetch the indexDB-stored workspace database
    getAllWS: async () => {
      return new Workspace().getWS()
        .then(ws => ws)
        .catch(e => console.log('Error > getAllWS :>> ', e))
    },

    // Fetch the indexDB-stored workspace database
    getAllTabs: async () => {
      return new Tab().getAllTabs()
        .then(tabs => tabs)
        .catch(e => console.log('Error > getAllTabs :>> ', e))
    },

    // Get the current tab
    getCurrentTab: async () => {
      const tab = await browser.tabs.query({ currentWindow: true, active: true })
      const { title, url } = tab[0]
      return { title, url }
    },

    // Query browser to get all current window's tabs
    getAllTabsFromWindow: async () => {
      return browser.tabs.query({ currentWindow: true })
        .then(tabs => tabs.map(({ title, url }) => { return { title, url } }))
        .catch(e => console.log('Error > getAllTabsFromWindow :>> ', e))
    },

    // TOGGLERS

    // TODO: divide between show and global home button
    // Show/hide the New WS form
    toggleAddingWS: ({ commit, state }, addingWS = null) => {
      commit('SET_SELECTED_WS', null)
      commit('SET_EDITING_WS', null)
      commit('SET_ADDING_WS', addingWS === null ? !state.addingWS : addingWS)
    },

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
