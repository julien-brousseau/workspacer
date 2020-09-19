import Vue from 'vue'
import Vuex from 'vuex'

const MUTATIONS_LOG = true

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ws: null,
    tabs: null,
    addingWS: false,
    selectedId: null,
    editingWS: false,
    editingTab: null
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
    },

    'SET_EDITING_TAB' (state, tabId) {
      state.editingTab = tabId
      if (MUTATIONS_LOG) console.log('SET_EDITING_TAB :>> ', state.editingTab)
    }
  },
  actions: {

    // Refresh all workspaces and tabs
    loadWS: async ({ commit }) => {
      const ws = await browser.runtime.sendMessage({ type: 'GET_WS' })
      commit('SET_WS', ws)
      const tabs = await browser.runtime.sendMessage({ type: 'GET_TABS' })
      commit('SET_TABS', tabs)
    },

    // Clear the workspace database
    clearWS: async ({ commit }) => {
      await browser.runtime.sendMessage({ type: 'CLEAR_ALL' })
      commit('SET_WS', [])
      commit('SET_TABS', [])
    },

    // Create a new Workspace object and return its id
    createOrUpdateWS: async ({ dispatch }, ws) => {
      const [{ id }] = await browser.runtime.sendMessage({ type: 'CREATE_OR_UPDATE_WS', ws })
      await dispatch('loadWS')
      return id
    },

    // Create tabs from an array of objects
    createOrUpdateTabs: async ({ dispatch }, tabs) => {
      const [{ id }] = await browser.runtime.sendMessage({ type: 'CREATE_OR_UPDATE_TAB', tabs })
      await dispatch('loadWS')
      return id
    },

    // Remove a tab by ID
    deleteTab: async ({ dispatch }, tabId) => {
      await browser.runtime.sendMessage({ type: 'DELETE_TAB', tabId })
      await dispatch('loadWS')
    },

    // GETTERS

    // Query browser for the current active tab
    getCurrentTab: async () => {
      const tab = await browser.tabs.query({ currentWindow: true, active: true })
      const { title, url } = tab[0]
      return { title, url }
    },

    // Query browser for all current window's tabs
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
    toggleSelectedWS: ({ commit }, wsId = null) => {
      commit('SET_SELECTED_WS', wsId)
    },

    // Show/hide the Edit WS form
    toggleEditingWS: ({ commit, state }, editingWS = null) => {
      commit('SET_EDITING_WS', editingWS === null ? !state.editingWS : editingWS)
    },

    // Set currently edited Tab id
    setEditingTab: ({ commit }, tabId = null) => {
      commit('SET_EDITING_TAB', tabId)
    }

  },
  getters: {
    allWS: state => state.ws,
    allTabs: state => state.tabs,
    addingWS: state => state.addingWS,
    selectedWS: state => state.ws.find(ws => ws.id === state.selectedId),
    selectedWSTabs: state => state.tabs.filter(tab => tab.wsId === state.selectedId),
    editingWS: state => state.editingWS,
    editingTab: state => state.editingTab
  }
})
