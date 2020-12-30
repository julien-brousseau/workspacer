import Vue from 'vue';
import Vuex from 'vuex';

// Enable to trace all mutations in console
const MUTATIONS_LOG = false;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ws: null, // Object
    tabs: null // Array
  },
  mutations: {
    // Replace state.ws with {wsData}
    'SET_WS' (state, wsData) {
      state.ws = wsData;
      if (MUTATIONS_LOG) console.log('SET_WS :>> ', state.ws);
    },
    // Replace state.tabs with [tabsData]
    'SET_TABS' (state, tabsData) {
      state.tabs = tabsData;
      if (MUTATIONS_LOG) console.log('SET_TABS :>> ', state.tabs);
    }
  },
  actions: {
    // Query browser to reload all [workspaces] and [tabs], then commit to state
    reloadWorkspacesAndTabs: async ({ commit }) => {
      browser.runtime.sendMessage({ type: 'GET_WS' })
        .then(ws => commit('SET_WS', ws))
        .then(() => browser.runtime.sendMessage({ type: 'GET_TABS' }))
        .then(tabs => commit('SET_TABS', tabs))
        .catch(e => console.log('Error > reloadWorkspacesAndTabs :>> ', e));
    },
    // Delete all [workspaces] and [tabs] from database, then clear the state
    deleteAllWorkspacesAndTabs: async ({ commit }) => {
      browser.runtime.sendMessage({ type: 'CLEAR_ALL' })
        .then(() => {
          commit('SET_WS', []);
          commit('SET_TABS', []);
        })
        .catch(e => console.log('Error > deleteAllWorkspacesAndTabs :>> ', e));
    },

    // Create a new {Workspace} object, then reload all [workspaces] and return the created Workspace id
    createOrUpdateWorkspace: async ({ dispatch }, ws) => {
      return browser.runtime.sendMessage({ type: 'CREATE_OR_UPDATE_WS', ws })
        .then(([{ id }]) => {
          dispatch('reloadWorkspacesAndTabs');
          return id;
        })
        .catch(e => console.log('Error > createOrUpdateWorkspace :>> ', e));
    },
    // Delete a {workspace} object
    deleteWorkspace: async ({ dispatch }, id) => {
      dispatch('deleteAllTabsFromWorkspace', id)
        .then(() => browser.runtime.sendMessage({ type: 'DELETE_WS', id }))
        .then(() => dispatch('reloadWorkspacesAndTabs'))
        .then(result => result)
        .catch(e => console.log('Error > deleteWorkspace :>> ', e));
    },

    // Create new {Tabs} in database from [tabs] argument, then reload data
    createOrUpdateTabs: async ({ dispatch }, { tabs, wsId = null }) => {
      // If no workspace id is supplied, fetch the one from the first tab
      wsId = wsId || tabs[0].wsId;
      browser.runtime.sendMessage({ type: 'CREATE_OR_UPDATE_TABS', tabs, wsId })
        .then(() => dispatch('reloadWorkspacesAndTabs'))
        .catch(e => console.log('Error > createOrUpdateTabs :>> ', e));
    },
    // Delete the {Tab} in database with id corresponding to tabId
    deleteTab: async ({ dispatch }, tabId) => {
      browser.runtime.sendMessage({ type: 'DELETE_TAB', tabId })
        .then(() => dispatch('reloadWorkspacesAndTabs'))
        .catch(e => console.log('Error > deleteTab :>> ', e));
    },
    // Delete all [Tabs] from specified workspace
    deleteAllTabsFromWorkspace: async ({ dispatch }, wsId) => {
      browser.runtime.sendMessage({ type: 'CLEAR_TABS', wsId })
        .then(() => dispatch('reloadWorkspacesAndTabs'))
        .catch(e => console.log('Error > deleteAllTabsFromWorkspace :>> ', e));
    },

    // Query browser to open a new window containing tabs from specified {workspace}
    createWindow: async ({ state }, workspace) => {
      const tabs = state.tabs.filter(t => t.wsId === workspace.id);
      if (tabs.length) browser.runtime.sendMessage({ type: 'NEW_WINDOW', workspace, tabs });
    },
    // Clear all tabs from workspace and add tabs from current window
    replaceWorkspace: async ({ dispatch }, wsId) => {
      await dispatch('deleteAllTabsFromWorkspace', wsId);
      dispatch('addAllTabsFromWindow', wsId);
    },

    // TODO: Move browser tab queries to background?
    // Fetch the active {tab} from current window
    getActiveTab: async () => {
      browser.tabs.query({ currentWindow: true, active: true })
        .then(([tab]) => tab);
    },
    // Add the active {tab} to workspace
    addCurrentTab: async ({ dispatch }, wsId) => {
      const tab = await dispatch('getActiveTab');
      dispatch('createOrUpdateTabs', { tabs: [tab], wsId });
    },
    // Fetch all current window's [tabs] and create {tabs} in specified {workspace}
    addAllTabsFromWindow: async ({ dispatch }, wsId) => {
      return browser.tabs.query({ currentWindow: true })
        .then(tabs => {
          dispatch('createOrUpdateTabs', { tabs, wsId });
        })
        .catch(e => console.log('Error > getAllTabsFromWindow :>> ', e));
    },

    // Batch add ws and tabs (Settings > Load)
    importfromJSON: async ({ dispatch }, { ws, tabs }) => {
      ws.forEach(async (w) => {
        const id = await dispatch('createOrUpdateWorkspace', w);
        const blop = tabs.filter(t => t.wsId === id);
        await dispatch('createOrUpdateTabs', { tabs: blop, wsId: id });
      });
      return true;
    },
    // Export all data in ~/Downloads/data.json
    exportToJSON: async ({ state }) => {
      return browser.runtime.sendMessage({ type: 'EXPORT', ws: state.ws, tabs: state.tabs })
        .then(() => true)
        .catch(e => console.log('Error > exportToJSON :>> ', e));
    }
  },
  getters: {
    allWS: state => state.ws,
    allTabs: state => state.tabs
  }
});
