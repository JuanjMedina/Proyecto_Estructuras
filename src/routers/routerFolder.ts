/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { FolderController } from '../controllers/folderController'

export const createFolderRouter = ({
  notesModel
}: {
  notesModel: any
}): Router => {
  const userController = new FolderController({ notesModel })
  const notesRouter = Router()

  notesRouter.get('/', userController.getAllUser)

  notesRouter.post('/', userController.CreateUser)

  notesRouter.get('/:id')

  notesRouter.delete('/:id', userController.deleteUser)

  return notesRouter
}
