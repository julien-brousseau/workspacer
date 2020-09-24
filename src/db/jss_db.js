import { connection } from './jss_connexion';
import { DATA_TYPE } from 'jsstore';

const getDatabase = () => {
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
      // Caps to prevent mixup with tab regular id
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

export const initJSS = async () => {
  const dataBase = getDatabase();
  return await connection.initDb(dataBase);
};
