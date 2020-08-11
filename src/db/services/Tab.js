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

  createOrUpdateTab (tabArray) {
    return connection.insert({
      into: this.tableName,
      values: tabArray,
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

  clearTabs () {
    return connection.clear(this.tableName)
  }
}
