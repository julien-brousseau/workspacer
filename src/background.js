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

    default:
      return false
  }
}

// browser.runtime.onMessage.addListener(handleMessage)
// function handleMessage (request, sender, sendResponse) {
//   console.log(request, sender, sendResponse) // logs "your message"
// }

// browser.browserAction.onClicked.addListener(() => {
//   browser.tabs.executeScript({ file: 'content.js' })
// })
