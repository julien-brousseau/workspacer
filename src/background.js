browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Hello from the background', request)
})

// browser.runtime.onMessage.addListener(handleMessage)
// function handleMessage (request, sender, sendResponse) {
//   console.log(request, sender, sendResponse) // logs "your message"
// }

// browser.browserAction.onClicked.addListener(() => {
//   browser.tabs.executeScript({ file: 'content.js' })
// })
