/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { FolderController } from '../controllers/folderController'

export const createFolderRouter = ({
  notesModel
}: {
  notesModel: any
}): Router => {
  const folderController = new FolderController({ notesModel })
  const notesRouter = Router()

  notesRouter.get('/', folderController.getAllFolders)

  notesRouter.post('/', folderController.createFolder)

  notesRouter.delete('/:id', folderController.deleteFolder)

  return notesRouter
}
