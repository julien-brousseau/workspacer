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

  addWS (ws) {
    return connection.insert({
      into: this.tableName,
      values: [ws],
      return: true
    })
  }
}
