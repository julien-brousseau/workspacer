import { connection } from '../jss_connexion';

export class Tab {
  constructor () {
    this.tableName = 'Tabs';
  }

  getAllTabs () {
    return connection.select({
      from: this.tableName,
      order: {
        by: 'position',
        type: 'desc'
      }
    });
  }

  async getHighestTabPosition (wsId) {
    const tabs = await connection.select({
      from: this.tableName,
      where: { wsId },
      order: {
        by: 'position',
        type: 'desc'
      }
    });
    return tabs.length ? tabs[0].position : 0;
  }

  //
  async insertTabs (tabsArray) {
    // Filter out Firefox about: tabs
    const values = tabsArray.filter(t => t.url.slice(0, 6) !== 'about:');
    if (values.length < tabsArray.length) console.log('Warning: Pages using about: protocol cannot be saved in workspaces');

    return connection.insert({
      into: this.tableName,
      values,
      return: true
    });
  }

  //
  async updateTabs (tabsArray) {
    return connection.insert({
      into: this.tableName,
      values: tabsArray,
      upsert: true,
      return: true
    });
  }

  // Remove a single tab
  deleteTab (Id) {
    return connection.remove({
      from: this.tableName,
      where: { Id }
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

// async function addAndReorder (wsId) {
//   const tabs = await connection.select({ wsId })
//   const blop = tabs.sort((tab1, tab2) => { return tab1.position === tab2.position ? 0 : tab1.position > tab2.position ? 1 : -1 })
//   return blop
// }
