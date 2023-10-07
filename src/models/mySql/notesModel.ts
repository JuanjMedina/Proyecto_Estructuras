import mysql, { Connection } from 'mysql2/promise'

import { UUID, UserModel } from '../../types'
import { RowDataPacket } from 'mysql2'

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

  static async createUser ({ data }: { data: UserModel }): Promise<RowDataPacket[][]> {
    const { name, email, telefono } = data
    const connectiondb = await connect()
    if (connectiondb != null) {
      const [uuidResult] = await connectiondb.query<RowDataPacket[]>(
        'select uuid() uuid'
      )
      const [{ uuid }] = uuidResult
      try {
        const query: string =
          'insert into task_glide.usuarios values (UUID_TO_BIN(?),?,?,?)'
        await connectiondb?.query(query, [uuid, name, email, telefono])
      } catch (e) {
        throw new Error('Error al crear el usuario')
      }
      const [result] = await connectiondb.query<RowDataPacket[][]>(
        'select  nombre , email ,telefono from task_glide.usuarios;'
      )
      return result
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }

  static async getAllUser (): Promise<RowDataPacket[][]> {
    const connectiondb = await connect()
    if (connectiondb != null) {
      try {
        const query: string =
          'select  BIN_TO_UUID(id_usuario) id_usuario,nombre , email ,telefono from task_glide.usuarios;'
        const [result] = await connectiondb.query<RowDataPacket[][]>(query)
        return result
      } catch (e) {
        throw new Error('Error al consultar el usuario')
      }
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }

  static async deleteUser ({ id }: { id: UUID }): Promise<RowDataPacket[][]> {
    const connectiondb = await connect()
    if (connectiondb != null) {
      try {
        const query: string =
          'delete from task_glide.usuarios where usuarios.id_usuario = UUID_TO_BIN(?);'
        await connectiondb.query(query, id)
      } catch (e) {
        throw new Error('Error al eliminar el usuario')
      }
      const [result] = await connectiondb.query<RowDataPacket[][]>(
        'select  nombre , email ,telefono from task_glide.usuarios;'
      )
      return result
    } else {
      throw new Error('error al conectar con la base de datos')
    }
  }
}
