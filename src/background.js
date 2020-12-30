import _ from 'lodash';

// Database models
import { Models } from './db/models';

// Database services
import { Workspace } from './db/services/Workspace';
import { Tab } from './db/services/Tab';

Models();
browser.runtime.onMessage.addListener(handleMessageFromBackground);

// Route application based on "action.type"
async function handleMessageFromBackground (action, sender, sendResponse) {
  switch (action.type) {
    // Fetch all Workspaces
    case 'GET_WS':
      return await new Workspace().getAllWorkspaces();
    // Replace Workspace in {action.ws} if its id exists in database, otherwise create a new one
    case 'CREATE_OR_UPDATE_WS':
      return await new Workspace().createOrUpdateWorkspace(action.ws);
    // Remove selected workspace
    case 'DELETE_WS':
      return await new Workspace().destroyWorkspace(action.id);

    // Fetch all Tabs
    case 'GET_TABS':
      return await new Tab().getAllTabs();
    // Insert or update all Tabs contained in [action.tabs] after formatting them
    case 'CREATE_OR_UPDATE_TABS':
      return await new Tab().createOrEditTabs(formatTabs(action.tabs, action.wsId));
    // Remove tab corresponding to "action.tabId"
    case 'DELETE_TAB':
      return await new Tab().destroyTab(action.tabId);
    // Remove all tabs from workspace
    case 'CLEAR_TABS':
      return await new Tab().destroyAllTabsFromWorkspace(action.wsId);

    // Remove all Workspaces and Tabs from the database
    case 'CLEAR_ALL_WORKSPACES_AND_TABS':
      await new Workspace().destroyAllWorkspaces();
      await new Tab().destroyAllTabs();
      return true;

    // Fetch currently active tab from browser
    case 'GET_CURRENT_TAB':
      return await fetchActiveTab();
    // Fetch all Tabs from current window
    case 'GET_CURRENT_WINDOW_TABS':
      return await fetchAllTabsFromWindow();

    // Open a new browser window with [action.tabs]
    case 'NEW_WINDOW':
      createWindowWithTabs(action.tabs);
      return true;
      // Export a json file containing [action.ws] and [action.tabs]
    case 'EXPORT':
      saveAsJSON(action.ws, action.tabs);
      return true;

    default:
      return false;
  }
}

// Fetch the active {tab} from current window
async function fetchActiveTab () {
  return browser.tabs.query({ currentWindow: true, active: true })
    .then(([tab]) => tab);
}

// Fetch all tabs from the current window
async function fetchAllTabsFromWindow () {
  return browser.tabs.query({ currentWindow: true })
    .then(tabs => tabs)
    .catch(e => console.log('Error > fetchAllTabsFromWindow :>> ', e));
}

// Query browser to create a new window containing [tabs]
async function createWindowWithTabs (tabs) {
  browser.windows.create()
    .then(window => {
      // Create a new tabs
      tabs.forEach(tab => {
        browser.tabs.create({
          // Remove properties conflicting with browser tab creation
          ..._.omit(tab, ['tabId', 'position', 'wsId', 'favIconUrl']),
          windowId: window.id,
          // Force title only for undiscarded tabs
          title: tab.discarded ? tab.title : null,
          // Auto-discard tab if not pinned
          discarded: !tab.pinned
        });
      });
      // Remove the empty tab at position 1 (created automatically by browser)
      browser.tabs.remove(window.tabs[0].id);
    });
}

// Create a json file containing all workspaces and tabs
function saveAsJSON (ws, tabs) {
  const json = JSON.stringify({ ws, tabs });
  const type = 'text/json;charset=utf-8';
  const filename = 'data.json';

  const url = URL.createObjectURL(new Blob([json], { type }));
  browser.downloads.download({ url, filename });
}

// Prepare new {tabs} obtained from browser prior to insertion into database
function formatTabs (tabsArray, wsId) {
  // Filter out Firefox about: tabs
  const tabs = tabsArray.filter(t => t.url.slice(0, 6) !== 'about:');
  // Print console error if invalid tabs are inserted
  if (tabs.length < tabsArray.length) console.log('Warning: Pages using about: protocol cannot be saved in workspaces');
  // Add the workspace ID and filter out useless properties (from browser Tab objects)
  return tabs
    .map(t => ({ ..._.pick(t, ['tabId', 'wsId', 'title', 'url', 'pinned', 'discarded', 'favIconUrl', 'position']) }))
    .map(t => ({ ...t, wsId }));
}
