import _ from 'lodash'; // used in createTabs > _.pick(...)

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
    // Replace state.ws with [wsData]
    'SET_WS' (state, wsData) {
      state.ws = wsData;
      if (MUTATIONS_LOG) console.log('SET_WS :>> ', state.ws);
    },
    // Replace state.tabs with [tabsData] sorted by position
    'SET_TABS' (state, tabsData) {
      state.tabs = tabsData.sort((a, b) => a.position === b.position ? 0 : a.position > b.position ? 1 : -1);
      if (MUTATIONS_LOG) console.log('SET_TABS :>> ', state.tabs);
    }
  },
  actions: {
    // Query browser to reload all [workspaces] and [tabs], then commit to state props
    loadWS: async ({ commit }) => {
      const ws = await browser.runtime.sendMessage({ type: 'GET_WS' });
      commit('SET_WS', ws);
      const tabs = await browser.runtime.sendMessage({ type: 'GET_TABS' });
      commit('SET_TABS', tabs);
    },
    // Delete all [workspaces] and [tabs] from database, then clear the state props
    clearWS: async ({ commit }) => {
      await browser.runtime.sendMessage({ type: 'CLEAR_ALL' });
      commit('SET_WS', []);
      commit('SET_TABS', []);
    },
    // Batch add ws and tabs (Settings > Load)
    importfromJSON: async ({ dispatch }, { ws, tabs }) => {
      ws.forEach(async (w) => {
        const id = await dispatch('createOrUpdateWS', w);
        const blop = tabs.filter(t => t.wsId === id);
        await dispatch('createTabs', { tabs: blop, wsId: id });
      });
      return true;
    },
    // Create a new {Workspace} object, then reload all [workspaces] and return the created Workspace id
    createOrUpdateWS: async ({ dispatch }, ws) => {
      const [{ id }] = await browser.runtime.sendMessage({ type: 'CREATE_OR_UPDATE_WS', ws });
      await dispatch('loadWS');
      return id;
    },
    //
    deleteWS: async ({ dispatch }, id) => {
      await dispatch('clearTabs', id);
      await browser.runtime.sendMessage({ type: 'DELETE_WS', id });
      await dispatch('loadWS');
      return true;
    },

    // Create new {Tabs} in database from [tabs] argument, then reload data
    createTabs: async ({ state, dispatch }, { tabs, wsId }) => {
      // Filter properties from original Tab objects and add workspace id
      tabs = tabs.map(t => ({ ..._.pick(t, ['Id', 'wsId', 'title', 'url', 'pinned', 'discarded', 'favIconUrl']), wsId }));
      // Reset the tabs positions
      const reorderedTabs = reorderTabs([...state.tabs, ...tabs]);
      // Send action to browser, then reload data
      browser.runtime.sendMessage({ type: 'CREATE_TABS', tabs: reorderedTabs })
        .then(() => dispatch('loadWS'))
        .catch(e => console.log('Error > createTabs :>> ', e));
    },
    // Replace all {Tabs} in database contained in [tabs], then reload data
    editTabs: async ({ dispatch }, tabs) => {
      const reorderedTabs = reorderTabs(tabs);
      browser.runtime.sendMessage({ type: 'EDIT_TABS', tabs: reorderedTabs })
        .then(() => dispatch('loadWS'))
        .catch(e => console.log('Error > editTabs :>> ', e));
    },
    // Delete the {Tab} in database with id corresponding to tabId
    deleteTab: async ({ dispatch }, tabId) => {
      await browser.runtime.sendMessage({ type: 'DELETE_TAB', tabId });
      await dispatch('loadWS');
    },
    // Delete all [Tabs] from specified workspace
    clearTabs: async ({ dispatch }, wsId) => {
      await browser.runtime.sendMessage({ type: 'CLEAR_TABS', wsId });
      await dispatch('loadWS');
    },
    // Query browser to open a new window containing tabs from specified {workspace}
    createWindow: async ({ state }, workspace) => {
      const tabs = state.tabs.filter(t => t.wsId === workspace.id);
      if (tabs.length) browser.runtime.sendMessage({ type: 'NEW_WINDOW', workspace, tabs });
    },
    // Clear all tabs from workspace and add tabs from current window
    replaceWorkspace: async ({ dispatch }, wsId) => {
      await dispatch('clearTabs', wsId);
      dispatch('addAllTabsFromWindow', wsId);
    },

    // TODO: Move browser tab queries to background?
    // Fetch the active {tab} from current window
    getActiveTab: async () => {
      const tabs = await browser.tabs.query({ currentWindow: true, active: true });
      return tabs[0];
    },
    // Add the active {tab} to workspace
    addCurrentTab: async ({ dispatch }, wsId) => {
      const tab = await dispatch('getActiveTab');
      dispatch('createTabs', { tabs: [tab], wsId });
    },
    // Fetch all current window's [tabs] and create {tabs} in specified {workspace}
    addAllTabsFromWindow: async ({ dispatch }, wsId) => {
      return browser.tabs.query({ currentWindow: true })
        .then(tabs => {
          dispatch('createTabs', { tabs, wsId });
        })
        .catch(e => console.log('Error > getAllTabsFromWindow :>> ', e));
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

//
function reorderTabs (tabs) {
  return tabs
    .sort((x, y) => y.pinned - x.pinned)
    .map((t, i) => ({ ...t, position: (i + 1) }));
  // console.log('tabs :>> ', tabs.map(t => ({ pinned: t.pinned, order: t.position, title: t.title })));
  // return tabs;
}
