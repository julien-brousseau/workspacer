import { connection } from '../jss_connexion';

// Database operations
export class Workspace {
  constructor () {
    this.tableName = 'Workspaces';
  }

  //
  getAllWorkspaces () {
    return connection.select({
      from: this.tableName
    });
  }

  //
  createOrUpdateWorkspace (ws) {
    return connection.insert({
      into: this.tableName,
      values: [ws],
      upsert: true,
      return: true
    });
  }

  //
  destroyWorkspace (id) {
    return connection.remove({
      from: this.tableName,
      where: { id }
    });
  }

  //
  destroyAllWorkspaces () {
    return connection.clear(this.tableName);
  }
}
