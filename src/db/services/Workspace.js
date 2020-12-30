import { connection } from '../jss_connexion';

// Database operations
export class Workspace {
  constructor () {
    this.tableName = 'Workspaces';
  }

  // Select
  getAllWorkspaces () {
    return connection.select({
      from: this.tableName
    });
  }

  // Insert / update
  createOrUpdateWorkspace (ws) {
    return connection.insert({
      into: this.tableName,
      values: [ws],
      upsert: true,
      return: true
    });
  }

  // Delete
  destroyWorkspace (id) {
    return connection.remove({
      from: this.tableName,
      where: { id }
    });
  }

  // Delete all
  destroyAllWorkspaces () {
    return connection.clear(this.tableName);
  }
}
