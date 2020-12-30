import { connection } from '../jss_connexion';

// Database operations
export class Tab {
  constructor () {
    this.tableName = 'Tabs';
  }

  // Fetch all tabs
  async getAllTabs () {
    return connection.select({
      from: this.tableName,
      order: { by: 'position', type: 'asc' }
    });
  }

  // Add tabs contained in [tabData] and/or replace them if tabId already exists.
  // Also rebuild positions based on previous positions and pinned status
  async createOrEditTabs (tabData) {
    // Fetch tabs from workspace whose tabId is not included in tabData
    const tabIds = tabData.map(t => t.tabId);
    const tabsFromWorkspace = (await this.getAllTabs()).filter(t => t.wsId === tabData[0].wsId && !tabIds.includes(t.tabId));
    // Merge filtered workspace tabs with new tabData
    const values = [...tabsFromWorkspace, ...tabData]
      // Sort by position and pinned status
      .sort((a, b) => a.position === b.position ? 0 : a.position > b.position ? 1 : -1)
      .sort((a, b) => b.pinned - a.pinned)
      // Reset the position of each tab
      .map((t, i) => ({ ...t, position: i + 1 }));
    // Insert/update tabs
    return connection.insert({
      into: this.tableName,
      values,
      upsert: true,
      return: true
    });
  }

  // Remove a single tab
  destroyTab (tabId) {
    return connection.remove({
      from: this.tableName,
      where: { tabId }
    });
  }

  // Remove all tabs from specified workspace
  destroyAllTabsFromWorkspace (wsId) {
    return connection.remove({
      from: this.tableName,
      where: { wsId }
    });
  }

  // Empty database
  destroyAllTabs () {
    return connection.clear(this.tableName);
  }
}
