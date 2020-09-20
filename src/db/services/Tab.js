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

  async upsertTabs (tabsArray) {
    // TODO: Refactor WS editing, put save button at bottom and make the changes savable - thus easier to sort/pin/etc, then save

    // Included tab props to filter
    const props = ['Id', 'wsId', 'title', 'url', 'position', 'pinned', 'discarded']

    // Get tabs from current WS to find order
    const wsId = tabsArray[0].wsId
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

    // Add position to tabs
    const filteredTabs = tabsArray.map(t => { return { ..._.pick(t, props), position } })

    // Insert or update the tabs array
    return connection.insert({
      into: this.tableName,
      values: filteredTabs,
      upsert: true,
      return: true
    })
  }

  deleteTab (id) {
    return connection.remove({
      from: this.tableName,
      where: { id }
    })
  }

  clearTabs () {
    return connection.clear(this.tableName)
  }
}
