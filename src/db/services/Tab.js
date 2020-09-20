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

  // TODO: Refactor WS editing, put save button at bottom and make the changes savable - thus easier to sort/pin/etc, then save
  async upsertTabs (tabsArray, wsId) {
    // Included tab props to filter
    const props = ['Id', 'wsId', 'title', 'url', 'position', 'pinned', 'discarded']

    // Get tabs from current WS to find order
    const nt = await connection.select({
      from: this.tableName,
      where: { wsId },
      order: {
        by: 'position',
        type: 'desc'
      },
      limit: 1
    })
    const position = nt.length ? nt[0].position + 1 : 1

    // Add position and workspace id to tabs
    const filteredTabs = tabsArray.map(t => { return { ..._.pick(t, props), position, wsId } })

    // Insert or update the tabs array
    return connection.insert({
      into: this.tableName,
      values: filteredTabs,
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
