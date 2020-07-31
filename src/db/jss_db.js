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
      url: {
        dataType: DATA_TYPE.String
        // notNull: true
      }
    }
  }
  return { name: 'Workspaces database', tables: [table] }
}

export const initJSS = async () => {
  const dataBase = getDatabase()
  return await connection.initDb(dataBase)
}
