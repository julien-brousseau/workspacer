import _ from 'lodash'; // used in createWindow > _.omit(...)

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
    // Fetch all Tabs
    case 'GET_TABS':
      return await new Tab().getAllTabs();
    // Replace Workspace in {action.ws} if its id exists in database, otherwise create a new one
    case 'CREATE_OR_UPDATE_WS':
      return await new Workspace().createOrUpdateWS(action.ws);
    // Remove selected workspace
    case 'DELETE_WS':
      return await new Workspace().deleteWS(action.id);

    // Insert all Tabs contained in [action.tabs]
    case 'CREATE_TABS':
      return await new Tab().insertTabs(action.tabs);
    // Replace all Tabs contained in [action.tabs]
    case 'EDIT_TABS':
      return await new Tab().insertTabs(action.tabs);
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
          ..._.omit(tab, ['Id', 'position', 'wsId', 'favIconUrl']),
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
