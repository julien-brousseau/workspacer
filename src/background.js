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
      return await new Workspace().getWS();
    // Replace Workspace in {action.ws} if its id exists in database, otherwise create a new one
    case 'CREATE_OR_UPDATE_WS':
      return await new Workspace().createOrUpdateWS(action.ws);
    // Remove selected workspace
    case 'DELETE_WS':
      return await new Workspace().deleteWS(action.id);

    // Fetch all Tabs
    case 'GET_TABS':
      return await new Tab().getAllTabs();
    // Insert all Tabs contained in [action.tabs] after formatting and inserting action.wsId
    case 'CREATE_TABS':
      return await new Tab().createOrEditTabs(formatNewTabs(action.tabs, action.wsId));
    // Replace all Tabs contained in [action.tabs]
    case 'EDIT_TABS':
      return await new Tab().createOrEditTabs(action.tabs);
    // Remove tab corresponding to "action.tabId"
    case 'DELETE_TAB':
      return await new Tab().deleteTab(action.tabId);
    // Remove all tabs from workspace
    case 'CLEAR_TABS':
      return await new Tab().clearTabsFromWorkspace(action.wsId);
    // Remove all Workspaces and Tabs from the database
    case 'CLEAR_ALL':
      await new Workspace().clearWS();
      await new Tab().clearTabs();
      return true;

      // Open a new browser window with [action.tabs]
    case 'NEW_WINDOW':
      createWindow(action.workspace, action.tabs);
      return true;
      // Export a json file containing [action.ws] and [action.tabs]
    case 'EXPORT':
      saveAsJSON(action.ws, action.tabs);
      return true;

    default:
      return false;
  }
}

// Query browser to create a new window with tabs contained in [tabs] arg
async function createWindow (workspace, tabs) {
  browser.windows.create()
    .then(window => {
      // Create a new tabs
      tabs.forEach(tab => {
        browser.tabs.create({
          // Remove conflicting properties
          ..._.omit(tab, ['tabId', 'position', 'wsId', 'favIconUrl']),
          windowId: window.id,
          title: tab.discarded ? tab.title : null,
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
function formatNewTabs (tabsArray, wsId) {
  // Filter out Firefox about: tabs
  const tabs = tabsArray.filter(t => t.url.slice(0, 6) !== 'about:');
  // Print console error if invalid tabs are inserted
  if (tabs.length < tabsArray.length) console.log('Warning: Pages using about: protocol cannot be saved in workspaces');

  // Add the workspace ID and filter out useless properties (from browser Tab objects)
  return tabs
    .map(t => ({ ...t, wsId }))
    .map(t => ({ ..._.pick(t, ['wsId', 'title', 'url', 'pinned', 'discarded', 'favIconUrl']) }));
}
