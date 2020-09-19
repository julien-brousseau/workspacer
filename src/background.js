import { initJSS } from './db/jss_db'
import { Workspace } from './db/services/Workspace'
import { Tab } from './db/services/Tab'

// browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request === 'blop') {
//     const blop = new Workspace().getWS()
//     return Promise.resolve(blop)
//   }
// })

browser.runtime.onMessage.addListener(handleMessageFromBackground)
initJSS()

async function handleMessageFromBackground (action, sender, sendResponse) {
  if (action === 'GET_WS') {
    return await new Workspace().getWS()
  }
  if (action === 'GET_TABS') {
    return await new Tab().getAllTabs()
  }
  return false
}

// browser.runtime.onMessage.addListener(handleMessage)
// function handleMessage (request, sender, sendResponse) {
//   console.log(request, sender, sendResponse) // logs "your message"
// }

// browser.browserAction.onClicked.addListener(() => {
//   browser.tabs.executeScript({ file: 'content.js' })
// })
