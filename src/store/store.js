import _ from 'lodash'; // used in createTabs > _.pick(...)

import Vue from 'vue';
import Vuex from 'vuex';

// Enable to trace all mutations in console
const MUTATIONS_LOG = false;

Vue.use(Vuex);

// TODO: Find a way to filter tabs to prevent urls starting with 'about:'

export default new Vuex.Store({
  state: {
    ws: null, // Object
    tabs: null, // Array
    selectedTab: null // Id
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
    },
    //
    'SET_SELECTED_TAB' (state, tabId) {
      state.selectedTab = tabId;
      if (MUTATIONS_LOG) console.log('SET_SELECTED_TAB :>> ', state.selectedTab);
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
    // Create new {Tabs} in database from [tabs], then reload data
    createTabs: async ({ state, dispatch }, { tabs, wsId }) => {
      // Get highest position from current workspace tab list
      const pos = state.tabs
        .filter(t => t.wsId === wsId)
        .reduce((acc, cur) => cur.position > acc ? cur.position : acc, 0);

      // Filter properties from original Tab object, then and add wsId and position (order)
      tabs = tabs.map((t, i) => ({ ..._.pick(t, ['Id', 'wsId', 'title', 'url', 'pinned', 'discarded']), wsId, position: (pos + 1 + i) }));

      // Send action to browser, then reload data
      browser.runtime.sendMessage({ type: 'CREATE_TABS', tabs })
        .then(() => dispatch('loadWS')) // Tabs usable as argument
        .catch(e => console.log('Error > createTabs :>> ', e));
    },
    // Replace all {Tabs} in database contained in [tabs], then reload data
    // TODO: Merge with createTabs?
    editTabs: async ({ dispatch }, tabs) => {
      browser.runtime.sendMessage({ type: 'EDIT_TABS', tabs })
        .then(() => dispatch('loadWS')) // Tabs usable as argument
        .catch(e => console.log('Error > editTabs :>> ', e));
    },
    // Delete the {Tab} in database with id corresponding to tabId
    deleteTab: async ({ dispatch }, tabId) => {
      await browser.runtime.sendMessage({ type: 'DELETE_TAB', tabId });
      await dispatch('loadWS');
    },
    // Query browser to open a new window containing tabs from specified {workspace}
    createWindow: async ({ state }, workspace) => {
      const tabs = state.tabs.filter(t => t.wsId === workspace.id);
      if (tabs.length) browser.runtime.sendMessage({ type: 'NEW_WINDOW', workspace, tabs });
    },

    // // Reorder all {tabs} from same workspace as specified tab based on the move direction
    // moveTab: async ({ state, dispatch }, { tab, direction }) => {
    //   // Current WS tabs
    //   const tabs = state.tabs.filter(t => t.wsId === tab.wsId);
    //   // Current tab index in tabs array
    //   const index = tabs.indexOf(tab);
    //   // Swap the tab positions in array
    //   const mod = index + (direction === 'down' ? 1 : -1);
    //   [tabs[index], tabs[mod]] = [tabs[mod], tabs[index]];
    //   // Set new tab position order
    //   const orderedTabs = tabs.map((t, i) => ({ ...t, position: (i + 1) }));
    //   // Save reordered tabs and update state
    //   browser.runtime.sendMessage({ type: 'EDIT_TABS', tabs: orderedTabs })
    //     .then(() => dispatch('loadWS')) // Tabs usable as argument
    //     .catch(e => console.log('Error > moveTab :>> ', e));
    // },
    // // TODO: Test & Fix
    // tabIsLocked: ({ getters }, tab) => {
    //   const tabs = getters.allTabs.filter(t => t.wsId === tab.wsId);
    //   const index = tabs.findIndex(t => t.Id === tab.Id);
    //   const up = index === 0;
    //   const down = index === tabs.length - 1;
    //   return { up, down };
    // },

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
    // Query browser for all current window's [tabs]
    // TODO: Optimize & move to Background
    getAllTabsFromWindow: async () => {
      return browser.tabs.query({ currentWindow: true })
        .then(tabs => tabs)
        .catch(e => console.log('Error > getAllTabsFromWindow :>> ', e));
    },

    // FILE SUPPORT
    // Export all data in ~/Downloads/data.json
    exportToJSON: async ({ state }) => {
      return browser.runtime.sendMessage({ type: 'EXPORT', ws: state.ws, tabs: state.tabs })
        .then(() => true)
        .catch(e => console.log('Error > exportToJSON :>> ', e));
    },

    // Set or toggle id of the tab being edited (in TabItem component)
    selectTab: ({ state, commit }, tabId = null) => {
      const id = state.selectedTab === tabId ? null : tabId;
      commit('SET_SELECTED_TAB', id);
    }
  },
  getters: {
    allWS: state => state.ws,
    allTabs: state => state.tabs,
    selectedTab: state => state.selectedTab // For editing purposes
  }
});
