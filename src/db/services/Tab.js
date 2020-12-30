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
  // Also reset positions based on pinned status
  async createOrEditTabs (tabData) {
    // Fetch tabs from workspace whose tabId is not included in tabData
    const tabIds = tabData.map(t => t.tabId);
    const tabsFromWorkspace = (await this.getAllTabs()).filter(t => t.wsId === tabData[0].wsId && !tabIds.includes(t.tabId));
    // Merge workspace tabs with new tabData
    const allTabs = [...tabsFromWorkspace, ...tabData]
      // Sort by position and pinned status
      .sort((a, b) => a.position === b.position ? 0 : a.position > b.position ? 1 : -1)
      .sort((a, b) => b.pinned - a.pinned)
      // Reset the position of each tab
      .map((t, i) => ({ ...t, position: i + 1 }));
    // Insert/update tabs
    return connection.insert({
      into: this.tableName,
      values: allTabs,
      upsert: true,
      return: true
    });
  }

  // Remove a single tab
  deleteTab (tabId) {
    return connection.remove({
      from: this.tableName,
      where: { tabId }
    });
  }

  // Remove all tabs from specified workspace
  clearTabsFromWorkspace (wsId) {
    return connection.remove({
      from: this.tableName,
      where: { wsId }
    });
  }

  // Empty database
  clearTabs () {
    return connection.clear(this.tableName);
  }
}
