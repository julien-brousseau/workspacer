import Vue from 'vue';
import Vuex from 'vuex';

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
    },
    // Replace state.tabs with [tabsData]
    'SET_TABS' (state, tabsData) {
      state.tabs = tabsData;
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
      browser.runtime.sendMessage({ type: 'CLEAR_ALL_WORKSPACES_AND_TABS' })
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
          return dispatch('reloadWorkspacesAndTabs')
            .then(() => id);
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
    openWorkspaceInNewWindow: async ({ state }, wsId) => {
      const tabs = state.tabs.filter(t => t.wsId === wsId);
      if (!tabs.length) return false;
      browser.runtime.sendMessage({ type: 'NEW_WINDOW', tabs })
        .catch(e => console.log('Error > openWorkspaceInNewWindow :>> ', e));
    },
    // Query browser to replace all tabs from current window with the workspace tabs
    openWorkspaceInCurrentWindow: async ({ state }, wsId) => {
      const tabs = state.tabs.filter(t => t.wsId === wsId);
      if (!tabs.length) return false;
      browser.runtime.sendMessage({ type: 'REPLACE_WINDOW', tabs })
        .catch(e => console.log('Error > openWorkspaceInCurrentWindow :>> ', e));
    },

    // Clear all tabs from workspace and add tabs from current window
    replaceWorkspace: async ({ dispatch }, wsId) => {
      await dispatch('deleteAllTabsFromWorkspace', wsId);
      dispatch('addAllTabsFromWindow', wsId);
    },

    // Add the active {tab} to workspace
    addCurrentTabToWorkspace: async ({ dispatch }, wsId) => {
      browser.runtime.sendMessage({ type: 'GET_CURRENT_TAB' })
        .then(tab => dispatch('createOrUpdateTabs', { tabs: [tab], wsId }))
        .catch(e => console.log('Error > addCurrentTabToWorkspace :>> ', e));
    },
    // Fetch all current window's [tabs] and create {tabs} in specified {workspace}
    addAllTabsFromWindow: async ({ dispatch }, wsId) => {
      browser.runtime.sendMessage({ type: 'GET_CURRENT_WINDOW_TABS' })
        .then(tabs => dispatch('createOrUpdateTabs', { tabs: tabs, wsId }))
        .catch(e => console.log('Error > addAllTabsFromWindow :>> ', e));
    },

    // Batch add ws and tabs (Settings > Load)
    loadJSONData: async ({ dispatch }, { ws, tabs }) => {
      ws.forEach(async (w) => {
        const id = await dispatch('createOrUpdateWorkspace', w);
        const blop = tabs.filter(t => t.wsId === id);
        await dispatch('createOrUpdateTabs', { tabs: blop, wsId: id });
      });
      return true;
    },
    // Export all data in ~/Downloads/workspacer_data_TIMESTAMP.json
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
