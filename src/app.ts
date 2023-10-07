import express, { json } from 'express'
import cors from 'cors'
import { createNotesRouter } from './routers/router'
import { createTestRouter } from './Test_Entrega/routerTest'
import { createUserRouter } from './routers/routesUser'

export const createApp = ({ notesModel }: { notesModel: any }): void => {
  const app = express()

  app.use(cors())

  app.use(json())

  const PORT = process.env.PORT ?? 3000

  app.use('/user', createUserRouter({ notesModel }))

  app.use('/notes', createNotesRouter({ notesModel }))

  app.use('/test', createTestRouter)

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}
