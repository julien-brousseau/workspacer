import _ from 'lodash'
import { connection } from '../jss_connexion'

export class Tab {
  constructor () {
    this.tableName = 'Tabs'
  }

  getAllTabs () {
    return connection.select({
      from: this.tableName
    })
  }

  getTabsFromWS (wsId) {
    return connection.select({
      from: this.tableName,
      where: { wsId },
      order: {
        by: 'position',
        type: 'desc'
      }
    })
  }

  // Filter an array of tabs from browser and add them to workspace
  // TODO: Refactor WS editing, put save button at bottom and make the changes savable - thus easier to sort/pin/etc, then save
  async insertTabs (tabsArray, wsId) {
    // Included tab props to filter
    const props = ['Id', 'wsId', 'title', 'url', 'pinned', 'discarded']

    // Get highest position from current WS
    const nt = await connection.select({
      from: this.tableName,
      where: { wsId },
      order: {
        by: 'position',
        type: 'desc'
      }
    })
    const pos = nt.length ? nt[0].position + 1 : 1

    const filteredTabs = tabsArray
      // Filter properties and add wsId
      .map(t => ({ ..._.pick(t, props), wsId }))
      // Add positition
      .map((t, i) => ({ ...t, position: (pos + i) }))

    // Insert the tabs array
    return connection.insert({
      into: this.tableName,
      values: filteredTabs,
      return: true
    })
  }

  // Replace the recorded tabs with those in tabs array
  async updateTabs (tabs) {
    return connection.insert({
      into: this.tableName,
      values: tabs,
      upsert: true,
      return: true
    })
  }

  deleteTab (Id) {
    return connection.remove({
      from: this.tableName,
      where: { Id }
    })
  }

  clearTabs () {
    return connection.clear(this.tableName)
  }
}

// async function addAndReorder (wsId) {
//   const tabs = await connection.select({ wsId })
//   const blop = tabs.sort((tab1, tab2) => { return tab1.position === tab2.position ? 0 : tab1.position > tab2.position ? 1 : -1 })
//   return blop
// }
