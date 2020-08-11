import { connection } from '../jss_connexion'

export class Workspace {
  constructor () {
    this.tableName = 'Workspaces'
  }

  getWS () {
    return connection.select({
      from: this.tableName
    })
  }

  createOrUpdateWS (ws) {
    return connection.insert({
      into: this.tableName,
      values: [ws],
      upsert: true,
      return: true
    })
  }

  updateWS ({ id, title, tabs }) {
    return connection.update({
      in: this.tableName,
      set: { title, tabs },
      where: { id }
    })
  }

  clearWS () {
    return connection.clear(this.tableName)
  }
}
