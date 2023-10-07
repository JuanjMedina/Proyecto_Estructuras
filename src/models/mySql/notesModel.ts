import mysql, { Connection } from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'task_glide'
}

const CONNECTION_DATA = DEFAULT_CONFIG
const connect = async (): Promise<Connection | undefined> => {
  try {
    const connection = await mysql.createConnection(CONNECTION_DATA)
    return connection
  } catch (error) {
    console.log(error)
  }
}

export class notesModel {
  static async getAllNotes (): Promise<any> {
    const connectiondb = await connect()
    const result = await connectiondb?.query('select * from notas')
    if (result != null) {
      return result[0]
    }
  }
}
