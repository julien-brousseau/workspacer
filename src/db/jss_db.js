import { connection } from './jss_connexion'
import { DATA_TYPE } from 'jsstore'

const getDatabase = () => {
  const table = {
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
      },
      tabs: {
        dataType: DATA_TYPE.Array,
        default: []
      }
    }
  }
  return { name: 'Workspaces database', tables: [table] }
}

export const initJSS = async () => {
  const dataBase = getDatabase()
  return await connection.initDb(dataBase)
}
