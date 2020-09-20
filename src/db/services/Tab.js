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
      where: { wsId }
    })
  }

  async upsertTabs (tabsArray) {
    // TODO: Refactor WS editing, put save button at bottom and make the changes savable - thus easier to sort/pin/etc, then save

    const props = ['id', 'wsId', 'title', 'url', 'pinned', 'discarded', 'cookieStoreId', 'order']
    const wsId = tabsArray[0].wsId

    // Get tabs from current WS to find order
    const blop = await connection.select({
      from: this.tableName,
      where: { wsId },
      order: {
        by: 'position',
        type: 'desc',
        limit: 1
      }
    })

    const position = blop.length ? blop[0].position + 1 : 0

    return connection.insert({
      into: this.tableName,
      values: tabsArray.map(t => {
        const filteredTab = _.pick(t, props)
        return { ...filteredTab, position }
      }),
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
