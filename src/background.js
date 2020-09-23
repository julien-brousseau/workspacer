import _ from 'lodash'

import { initJSS } from './db/jss_db'
import { Workspace } from './db/services/Workspace'
import { Tab } from './db/services/Tab'

initJSS()
browser.runtime.onMessage.addListener(handleMessageFromBackground)

async function handleMessageFromBackground (action, sender, sendResponse) {
  switch (action.type) {
    case 'GET_WS':
      return await new Workspace().getWS()
    case 'GET_TABS':
      return await new Tab().getAllTabs()

    case 'CREATE_OR_UPDATE_WS':
      return await new Workspace().createOrUpdateWS(action.ws)

    case 'CREATE_TABS':
      return await new Tab().insertTabs(action.tabs)
    case 'EDIT_TABS':
      return await new Tab().updateTabs(action.tabs)

    case 'DELETE_TAB':
      return await new Tab().deleteTab(action.tabId)
    case 'CLEAR_ALL':
      await new Workspace().clearWS()
      await new Tab().clearTabs()
      return true

    case 'NEW_WINDOW':
      createWindow(action.tabs)
      return true

    default:
      return false
  }
}

async function createWindow (tabs) {
  browser.windows.create()
    .then(window => {
      tabs.forEach(tab => {
        browser.tabs.create({
          ..._.omit(tab, ['Id', 'position', 'wsId']),
          windowId: window.id,
          discarded: true
        })
      })
      // Remove the empty tab at position 1
      browser.tabs.remove(window.tabs[0].id)
    })
}