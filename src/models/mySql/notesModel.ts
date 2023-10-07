import mysql, { Connection } from 'mysql2/promise'

import { UUID, UserModel } from '../../types'

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

    const [uuidResult]: any = await connectiondb?.query('select uuid() uuid')
    const [{ uuid }] = uuidResult
    try {
      await connectiondb?.query(
        'insert into task_glide.usuarios values (UUID_TO_BIN(?),?,?,?)',
        [uuid, name, email, telefono]
      )
    } catch (e) {
      throw new Error('Error al crear el usuario')
    }
    const [result]: any = await connectiondb?.query(
      'select  nombre , email ,telefono from task_glide.usuarios;'
    )
    return result
  }

  static async getAllUser (): Promise<void> {
    const connectiondb = await connect()
    try {
      const [result] = await connectiondb?.query(
        'select  BIN_TO_UUID(id_usuario) id_usuario,nombre , email ,telefono from task_glide.usuarios;'
      )
      return result
    } catch (e) {
      throw new Error('Error al consultar el usuario')
    }
  }

  static async deleteUser ({ id }: { id: UUID }): Promise<void> {
    const connectiondb = await connect()
    try {
      await connectiondb?.query(
        'delete from task_glide.usuarios where usuarios.id_usuario = UUID_TO_BIN(?)',
        id
      )
    } catch (e) {
      throw new Error('Error al eliminar el usuario')
    }
    const [result]: any = await connectiondb?.query(
      'select  nombre , email ,telefono from task_glide.usuarios;'
    )
    return result
  }
}
