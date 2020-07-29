export default {
  storage: {
    local: {
      get: function (v) {
        return new Promise((resolve, reject) => {
          const ws = {
            'Workspace 1': [
              { id: 1, title: 'Domain.com', url: 'domain.com' },
              { id: 2, title: 'Github', url: 'github.com' }
            ],
            'Workspace 2': [
              { id: 3, title: 'Firefox', url: 'firefox.com', pinned: true },
              { id: 4, title: 'Desjardins', url: 'desjardins.ca' },
              { id: 5, title: 'Amazon', url: 'amazon.ca' }
            ]
          }
          resolve({ ws: JSON.stringify(ws) })
        })
      }
    }
  },
  tabs: {
    query (q) {
      return new Promise((resolve, reject) => {
        const tabs = [
          { id: 11, index: 0, title: 'Domain.com', url: 'domain.com' },
          { id: 222, index: 1, title: 'Github', url: 'github.com' },
          { id: 321, index: 0, title: 'Firefox', url: 'firefox.com', pinned: true },
          { id: 456, index: 1, title: 'Desjardins', url: 'desjardins.ca' },
          { id: 599, index: 2, title: 'Amazon', url: 'amazon.ca' }
        ]
        resolve(tabs)
      })
    }
  }
}
