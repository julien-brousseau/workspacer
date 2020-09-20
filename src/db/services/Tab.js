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

  createOrUpdateTabs (tabsArray) {
    // TODO: Refactor WS editing, put save button at bottom and make the changes savable - thus easier to sort/pin/etc, then save
    // const currentTabs = this.getTabsFromWS
    return connection.insert({
      into: this.tableName,
      values: tabsArray.map((t, i) => { return { ...t, order: i } }),
      upsert: true,
      return: true
    })
  }

  // updateTabs ({ id, title, tabs }) {
  //   return connection.update({
  //     in: this.tableName,
  //     set: { title, tabs },
  //     where: { id }
  //   })
  // }

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
