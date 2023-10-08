import express, { json } from 'express'
import cors from 'cors'
import { createTestRouter } from './Test_Entrega/routerTest'
import { createUserRouter } from './routers/routesUser'
import { createFolderRouter } from './routers/routerFolder'

export const createApp = ({ notesModel }: { notesModel: any }): void => {
  const app = express()

  app.use(cors())

  app.use(json())

  const PORT = process.env.PORT ?? 3000

  app.use('/user', createUserRouter({ notesModel }))

  app.use('/folders', createFolderRouter({ notesModel }))

  app.use('/test', createTestRouter)

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}
