/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'
import { NotesController } from '../controllers/notesController'
import { middlewareUser } from '../middellwares'

export const createNotesRouter = ({
  notesModel
}: {
  notesModel: any
}): Router => {
  const notesController = new NotesController({ notesModel })
  const notesRouter = Router()

  notesRouter.get('/', middlewareUser.validateToken, notesController.getAllNotes)

  notesRouter.post('/', notesController.createNote)

  notesRouter.get('/:id')

  notesRouter.delete('/:id')

  notesRouter.patch('/NotesandFolders', notesController.updateNote)

  return notesRouter
}
