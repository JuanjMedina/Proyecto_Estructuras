'use strict'
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator.throw(value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.notesModel = void 0
/* eslint-disable @typescript-eslint/no-extraneous-class */
const promise_1 = __importDefault(require('mysql2/promise'))
const DEFAULT_CONFIG = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'task_glide'
}
const CONNECTION_DATA = DEFAULT_CONFIG
const connect = () => __awaiter(void 0, void 0, void 0, function * () {
  try {
    const connection = yield promise_1.default.createConnection(CONNECTION_DATA)
    return connection
  } catch (error) {
    console.log(error)
  }
})
class notesModel {
  static createUser ({ data }) {
    return __awaiter(this, void 0, void 0, function * () {
      const { name, email, telefono } = data
      const connectiondb = yield connect()
      if (connectiondb != null) {
        const [uuidResult] = yield connectiondb.query('select uuid() uuid')
        const [{ uuid }] = uuidResult
        try {
          const query = 'insert into task_glide.usuarios values (UUID_TO_BIN(?),?,?,?)'
          yield (connectiondb === null || connectiondb === void 0 ? void 0 : connectiondb.query(query, [uuid, name, email, telefono]))
        } catch (e) {
          throw new Error('Error al crear el usuario')
        }
        const [result] = yield connectiondb.query('select  nombre , email ,telefono from task_glide.usuarios;')
        return result
      } else {
        throw new Error('Error al conectar con la base de datos')
      }
    })
  }

  static getAllUser () {
    return __awaiter(this, void 0, void 0, function * () {
      const connectiondb = yield connect()
      if (connectiondb != null) {
        try {
          const query = 'select  BIN_TO_UUID(id_usuario) id_usuario,nombre , email ,telefono from task_glide.usuarios;'
          const [result] = yield connectiondb.query(query)
          return result
        } catch (e) {
          throw new Error('Error al consultar el usuario')
        }
      } else {
        throw new Error('Error al conectar con la base de datos')
      }
    })
  }

  static deleteUser ({ id }) {
    return __awaiter(this, void 0, void 0, function * () {
      const connectiondb = yield connect()
      if (connectiondb != null) {
        try {
          const query = 'delete from task_glide.usuarios where usuarios.id_usuario = UUID_TO_BIN(?);'
          yield connectiondb.query(query, id)
        } catch (e) {
          throw new Error('Error al eliminar el usuario')
        }
        const [result] = yield connectiondb.query('select  nombre , email ,telefono from task_glide.usuarios;')
        return result
      } else {
        throw new Error('error al conectar con la base de datos')
      }
    })
  }

  static getAllFolders () {
    return __awaiter(this, void 0, void 0, function * () {
      const connectiondb = yield connect()
      if (connectiondb != null) {
        try {
          const query = 'select * from task_glide.carpetas;'
          const [result] = yield connectiondb.query(query)
          return result
        } catch (e) {
          throw new Error('Error al consultar las carpetas')
        }
      } else {
        throw new Error('Error al conectar con la base de datos')
      }
    })
  }

  static createFolder ({ data }) {
    return __awaiter(this, void 0, void 0, function * () {
      const { nombre } = data
      const connectiondb = yield connect()
      if (connectiondb != null) {
        try {
          const query = 'insert into task_glide.carpetas (nombre_carpeta) values (?) '
          yield connectiondb.query(query, nombre)
        } catch (e) {
          throw new Error('Error al crear la carpeta')
        }
      } else {
        throw new Error('Error al conectar con la base de datos')
      }
    })
  }

  static createNote ({ data }) {
    return __awaiter(this, void 0, void 0, function * () {
      const { temaNota, fechaNota, descripcionNota, idCarpeta } = data
      const connectiondb = yield connect()
      if (connectiondb != null) {
        try {
          const query = 'insert into task_glide.notas (tema_nota,fecha_nota,descripcion_nota,id_carpeta) values (?,?,?,?);'
          yield connectiondb.query(query, [
            temaNota,
            fechaNota,
            descripcionNota,
            idCarpeta
          ])
        } catch (e) {
          throw new Error('Error al crear la nota')
        }
      } else {
        throw new Error('Error al conectar con la base de datos')
      }
    })
  }

  static getAllNotes () {
    return __awaiter(this, void 0, void 0, function * () {
      const connectiondb = yield connect()
      if (connectiondb != null) {
        try {
          const query = 'select * from task_glide.notas;'
          const [result] = yield connectiondb.query(query)
          return result
        } catch (e) {
          throw new Error('Error al consultar las notas')
        }
      } else {
        throw new Error('Error al conectar con la base de datos')
      }
    })
  }

  static deleteFolder ({ id }) {
    return __awaiter(this, void 0, void 0, function * () {
      const connectiondb = yield connect()
      if (connectiondb != null) {
        try {
          const query = 'delete from task_glide.carpetas where task_glide.carpetas.id_carpeta= (?);'
          yield connectiondb.query(query, id)
        } catch (e) {
          throw new Error('Error al eliminar el usuario')
        }
      } else {
        throw new Error('error al conectar con la base de datos')
      }
    })
  }
}
exports.notesModel = notesModel
