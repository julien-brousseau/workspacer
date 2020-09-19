import { connection } from './jss_connexion'
import { DATA_TYPE } from 'jsstore'

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
  }

  const tabTable = {
    name: 'Tabs',
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true
      },
      wsId: {
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
      }
    }
  }

  return { name: 'Workspaces database', tables: [wsTable, tabTable] }
}

export const initJSS = async () => {
  const dataBase = getDatabase()
  return await connection.initDb(dataBase)
}
