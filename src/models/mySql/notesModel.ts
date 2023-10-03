import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'notes'
}

const CONNECTION_DATA = DEFAULT_CONFIG
const connection = await mysql.createConnection(CONNECTION_DATA)
