const Browser = {
  // storage: {
  //   local: {
  //     get: function (v) {
  //       return new Promise((resolve, reject) => {
  //         const ws = {
  //           'Workspace 1': [
  //             { id: 1, title: 'Domain.com', url: 'domain.com' },
  //             { id: 2, title: 'Github', url: 'github.com' }
  //           ],
  //           'Workspace 2': [
  //             { id: 3, title: 'Firefox', url: 'firefox.com', pinned: true },
  //             { id: 4, title: 'Desjardins', url: 'desjardins.ca' },
  //             { id: 5, title: 'Amazon', url: 'amazon.ca' }
  //           ]
  //         }
  //         resolve({ ws: JSON.stringify(ws) })
  //       })
  //     },
  //     set: function (v) {
  //       return new Promise((resolve, reject) => {
  //         resolve()
  //       })
  //     }
  //   }
  // },
  // Currently opened tabs
  tabs: {
    query (q) {
      return new Promise((resolve, reject) => {
        const tabs = [
          { id: 11, index: 0, title: 'A very long title for a tab, like, way too long to fit inside the small popup window', url: 'but.a.short.url.com' },
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

class Workspace {
  getWS () {
    return new Promise((resolve) => {
      resolve([
        {
          id: 1,
          title: 'Workspace #225',
          tabs: [
            { id: 121, title: 'Google', url: 'about:debugging#/runtime/this-firefox' },
            { id: 123, title: 'Firefox', url: 'about:devtools-toolbon&id=97n' },
            { id: 128, title: 'Debugging - Runtime / this-firefox', url: 'about:debugging#/runtime/this-firefox' }
          ]
        },
        {
          id: 2,
          title: 'Workspace #25',
          tabs: [
            { id: 125, title: 'Debugging - Runtime / this-firefox', url: 'about:debugging#/runtime/this-firefox' },
            { id: 126, title: 'Toolbox - Extension / Workspacer', url: 'about:devtools-toolbox?type=extension&id=97n' },
            { id: 127, title: 'Debugging - Runtime / this-firefox', url: 'about:debugging#/runtime/this-firefox' }
          ]
        }
      ])
    })
  }

  createWS (ws) {
    // return connection.insert({
    //   into: this.tableName,
    //   values: [ws],
    //   return: true
    // })
  }

  updateWS ({ id, title, tabs }) {
    // return connection.update({
    //   in: this.tableName,
    //   set: { title, tabs },
    //   where: { id }
    // })
  }

  clearWS () {
    // return connection.clear(this.tableName)
  }
}

export { Browser, Workspace }
