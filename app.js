import express, { json } from 'express'
import cors from 'cors'
import { createNotesRouter } from './routers/router.js'

export const createApp = ({ movieModel }) => {
  const app = express()

  app.disable('x-powered-by')

  const port = process.env.PORT ?? 1234

  app.use(cors())

  app.use(json()) // middleware para parsear el body a json

  app.use('/notes', createNotesRouter({ movieModel }))

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}
