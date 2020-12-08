// JSStore database connexion init
import { connection } from './jss_connexion';
import { DATA_TYPE } from 'jsstore';

// Tab object properties
// active,
// attention,
// audible,
// cookieStoreId,
// discarded,
// favIconUrl,
// height,
// hidden,
// highlighted,
// id,
// incognito,
// index,
// isArticle,
// isInReaderMode,
// lastAccessed,
// mutedInfo,
// pinned,
// sharingState,
// status,
// successorTabId,
// title,
// url,
// width,
// windowId

// Model object
const getModels = () => {
  const wsTable = {
    name: 'Workspaces',
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        dataType: DATA_TYPE.String,
        notNull: true
      },
      description: {
        dataType: DATA_TYPE.String
        // notNull: true
      }
    }
  };

  const tabTable = {
    name: 'Tabs',
    columns: {
      // Capitalized to prevent mixup with tab regular id
      Id: {
        primaryKey: true,
        autoIncrement: true
      },
      wsId: {
        // primaryKey: true,
        dataType: DATA_TYPE.Integer,
        notNull: true
      },
      title: {
        dataType: DATA_TYPE.String,
        notNull: true
      },
      url: {
        dataType: DATA_TYPE.String,
        notNull: true
      },
      position: {
        dataType: DATA_TYPE.Integer,
        notNull: false
      },
      pinned: {
        dataType: DATA_TYPE.Boolean,
        notNull: true,
        default: false
      },
      discarded: {
        dataType: DATA_TYPE.Boolean,
        notNull: true,
        default: false
      }
      // cookieStoreId: {
      //   dataType: DATA_TYPE.Integer,
      //   notNull: true,
      //   default: false
      // },
      // favIconUrl: {
      //   dataType: DATA_TYPE.String,
      //   notNull: false
      // },
      // isInReaderMode: {
      //   dataType: DATA_TYPE.Boolean,
      //   notNull: false
      // },
    }
  };

  return { name: 'Workspaces database', tables: [wsTable, tabTable] };
};

// Export the connection object initialized with models
export const Models = async () => {
  const models = getModels();
  return await connection.initDb(models);
};
