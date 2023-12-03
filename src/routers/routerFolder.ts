/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { FolderController } from '../controllers/folderController'
import { middlewareUser } from '../middellwares'

export const createFolderRouter = ({
  notesModel
}: {
  notesModel: any
}): Router => {
  const folderController = new FolderController({ notesModel })
  const notesRouter = Router()

  notesRouter.get('/', folderController.getAllFolders)

  notesRouter.post(
    '/',
    middlewareUser.validateToken,
    folderController.createFolder
  )

  notesRouter.delete('/:id', folderController.deleteFolder)

  notesRouter.get(
    '/NotesandFolders',
    middlewareUser.validateToken,
    folderController.getAllNotesAndFolders
  )

  return notesRouter
}
