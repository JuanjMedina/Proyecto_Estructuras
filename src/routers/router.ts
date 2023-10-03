import { Router } from 'express'
import { NotesController } from '../controllers/Controller'

export const createNotesRouter = ({
  notesModel
}: {
  notesModel: any
}): Router => {
  const notesController = new NotesController({ notesModel })
  const notesRouter = Router()

  notesRouter.get('/', notesController.getNotes)

  notesRouter.post('/')

  notesRouter.get('/:id')

  notesRouter.delete('/:id')

  return notesRouter
}
