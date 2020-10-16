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
    return connection.insert({
      into: this.tableName,
      values: tabsArray,
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

  deleteTab (Id) {
    return connection.remove({
      from: this.tableName,
      where: { Id }
    });
  }

  clearTabs () {
    return connection.clear(this.tableName);
  }
}

// async function addAndReorder (wsId) {
//   const tabs = await connection.select({ wsId })
//   const blop = tabs.sort((tab1, tab2) => { return tab1.position === tab2.position ? 0 : tab1.position > tab2.position ? 1 : -1 })
//   return blop
// }
