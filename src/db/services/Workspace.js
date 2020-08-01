import { connection } from '../jss_connexion'

export class WorkspaceService {
  constructor () {
    this.tableName = 'Workspaces'
  }

  getWS () {
    return connection.select({
      from: this.tableName
    })
  }

  createWS (ws) {
    return connection.insert({
      into: this.tableName,
      values: [ws],
      return: true
    })
  }

  clearWS () {
    return connection.clear(this.tableName)
  }
}
