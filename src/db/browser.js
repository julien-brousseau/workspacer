const Browser = {
  tabs: {
    query ({ currentWindow, active }) {
      if (active) {
        return new Promise((resolve, reject) => {
          const tabs = [
            { id: 99, index: 0, title: 'The current tab', url: 'the.current.tab.com/a-very-lon-url-that-will-contain-way-too-much-DATA-to-show-on-a-single-line_requiring-a-filter.cgi?=cdh77v6gs5fvevg7sdv6ds5' }
          ]
          resolve(tabs)
        })
      } else {
        return new Promise((resolve, reject) => {
          const tabs = [
            { id: 11, index: 0, title: 'A very long title for a tab, like, way too long to fit inside the small popup window - A detailed explanation on the sudden disappearance of whatever...', url: 'but.a.short.url.com' },
            { id: 456, index: 1, title: 'A short title', url: 'usingaverylongurl.ca/d8y7DSV?dfvb8f9dfb_SDfd=+FD=dèkmccvDV6vdsf9dgg8df7cs5&?DF4FD&(DF)/SDvdi#57%SDf3#&f6edfdssjsd/url=dsobfdokiidfgfgdfunudhfgudfhugdhfughuhdgudfhguhdfughdufhdfg.com&blop=1}' },
            { id: 222, index: 1, title: 'Github', url: 'github.com' },
            { id: 321, index: 0, title: 'Firefox', url: 'firefox.com', pinned: true },
            { id: 599, index: 2, title: 'Amazon', url: 'amazon.ca' }
          ]
          resolve(tabs)
        })
      }
    }
  }
}

export { Browser }
