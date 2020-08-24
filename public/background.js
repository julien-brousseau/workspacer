var browser = require('webextension-polyfill')

browser.runtime.onMessage.addListener(async (msg, sender) => {
  console.log('BG page received message', msg, 'from', sender)
  console.log('Stored data', await browser.storage.local.get())
})

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.executeScript({ file: 'content.js' })
})
