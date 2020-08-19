import Vue from 'vue'
import Vuex from 'vuex'

// External data
import { initJSS } from '../db/jss_db'
import { Workspace } from '../db/services/Workspace'
import { Tab } from '../db/services/Tab'

// Un-comment this line to enable browser testing in regular Vue app
// import { Browser } from '../db/browser'
// const browser = Browser

const browser = require('webextension-polyfill')

const MUTATIONS_LOG = true

Vue.use(Vuex)

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
      if (MUTATIONS_LOG) console.log('SET_WS :>> ', state.ws)
    },

    'SET_TABS' (state, tabsData) {
      state.tabs = tabsData
      if (MUTATIONS_LOG) console.log('SET_TABS :>> ', state.tabs)
    },

    'CREATE_WS' (state, newWSData) {
      state.ws.unshift(newWSData)
      if (MUTATIONS_LOG) console.log('CREATE_WS :>> ', newWSData)
    },

    'CREATE_TAB' (state, createdTabs) {
      state.tabs = [...state.tabs, ...createdTabs]
      if (MUTATIONS_LOG) console.log('CREATE_TAB :>> ', state.tabs)
    },

    'SET_ADDING_WS' (state, isVisible) {
      state.addingWS = isVisible
      if (MUTATIONS_LOG) console.log('SET_ADDING_WS :>> ', state.addingWS)
    },

    'SET_SELECTED_WS' (state, wsId) {
      state.selectedId = wsId
      if (MUTATIONS_LOG) console.log('SET_SELECTED_WS :>> ', state.selectedId)
    },

    'SET_EDITING_WS' (state, isEditing) {
      state.editingWS = isEditing
      if (MUTATIONS_LOG) console.log('SET_EDITING_WS :>> ', state.editingWS)
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
      commit('SET_WS', [])
      await new Tab().clearTabs()
      commit('SET_TABS', [])
    },

    // Create a new Workspace object
    createOrUpdateWS: async ({ commit, dispatch }, ws) => {
      return new Workspace()

        .createOrUpdateWS(ws)
        // .then(([ws]) => dispatch('createTabss', tabs.map(t => {
        //   if (!t.wsId) t = { ...t, wsId: ws.id }
        //   return t
        // })))

        .then(() => dispatch('getAllWS'))
        .then(ws => commit('SET_WS', ws))

        .then(() => null)
        .catch(e => { console.log('Error > createOrUpdateWS :>> ', e); return e })
    },

    // Save the current tab into the selected Workspace
    // createTabss: async ({ dispatch, commit }, tabs) => {
    //   new Tab()
    //     .createOrUpdateTab(tabs)
    //     .then(tab => tab)
    //     .then(() => dispatch('getAllTabs'))
    //     .then(tabs => commit('SET_TABS', tabs))
    //     .catch(e => console.log('Error > createTabss :>> ', e))
    // },

    //
    createTabs: async ({ commit }, tabsArray) => {
      return new Tab()
        .createTabs(tabsArray)
        .then(tabs => {
          commit('CREATE_TAB', tabs)
          return tabs[0]
        })
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
    toggleAddingWS: ({ state, commit }, addingWS = null) => {
      commit('SET_SELECTED_WS', null)
      commit('SET_EDITING_WS', null)
      commit('SET_ADDING_WS', addingWS === null ? !state.addingWS : addingWS)
    },

    // Set selected WS id
    toggleSelectedWS: ({ state, commit }, id = null) => {
      const blop = state.selectedId === id ? null : id
      commit('SET_SELECTED_WS', blop)
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
    // TODO: Merge the 2 following so selectedWS returns the whole WS object??
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
