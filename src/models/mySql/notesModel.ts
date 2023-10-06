import mysql, { Connection } from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'notes'
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

// const runQuery = async (query: string): Promise<any[] | undefined> => { //! Cambiar any por el tipo de datos que se espera de la base de datos
//   const connectiondb = await connect()
//   if (connectiondb != null) {
//     try {
//       const result = await connectiondb.query(query)
//       return result
//     } catch (error) {
//       throw new Error(' Error al ejecutar la consulta')
//     }
//   }
// }

// export class notesModel {
//   static async getAllNotes (): Promise<any> {
//     const query = 'SELECT * FROM notas'
//     const result = await runQuery(query)
//     if (result != null) {
//       return result[0]
//     }
//   }
// }

export class notesModel {
  static async getAllNotes (): Promise<any> {
    const connectiondb = await connect()
    const result = await connectiondb?.query('select * from notas')
    if (result != null) {
      return result[0]
    }
  }
}
