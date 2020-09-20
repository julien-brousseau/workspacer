import { initJSS } from './db/jss_db'
import { Workspace } from './db/services/Workspace'
import { Tab } from './db/services/Tab'

initJSS()
browser.runtime.onMessage.addListener(handleMessageFromBackground)

async function handleMessageFromBackground (action, sender, sendResponse) {
  switch (action.type) {
    // Get
    case 'GET_WS':
      return await new Workspace().getWS()
    case 'GET_TABS':
      return await new Tab().getAllTabs()

    // Create / update
    case 'CREATE_OR_UPDATE_WS':
      return await new Workspace().createOrUpdateWS(action.ws)
    case 'CREATE_OR_UPDATE_TAB':
      return await new Tab().createOrUpdateTabs(action.tabs)

    // Delete
    case 'DELETE_TAB':
      return await new Tab().deleteTab(action.tabId)
    case 'CLEAR_ALL':
      await new Workspace().clearWS()
      await new Tab().clearTabs()
      return true

    // Window
    case 'NEW_WINDOW':
      createWindow(action.ws.id)
      return true

      // TODO: Move tab related methods here

    default:
      return false
  }
}

async function createWindow (wsId) {
  const tabs = await new Tab().getTabsFromWS(wsId)
  browser.windows.create()
    .then(window => {
      tabs.forEach(({ url }) => {
        browser.tabs.create({ url, windowId: window.id, discarded: true })
      })
      browser.tabs.remove(window.tabs[0].id)
    })
}
