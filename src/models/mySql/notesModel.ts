import mysql, { Connection } from 'mysql2/promise'

import { UserModel } from '../../types'

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

  static async createUser ({ data }: { data: UserModel }): Promise<any> {
    const { name, email, telefono } = data
    const connectiondb = await connect()
    console.log(name, email, telefono)
  }

  static async getAllUser (): Promise<void> {
    const connectiondb = await connect()
    try {
      const [result]: any = await connectiondb?.query(
        'select  nombre , email ,telefono from task_glide.usuarios;'
      )
      return result[0]
    } catch (e) {
      throw new Error('Error al consultar el usuario')
    }
  }
}
