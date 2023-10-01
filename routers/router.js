import { Router } from 'express'
import { NotesController } from '../controllers/Controller.js'
export const createNotesRouter = ({ movieModel }) => {
  const Controller = new NotesController({ movieModel })

  const notesRouter = Router()

  notesRouter.get('/', Controller.getNotes)

  notesRouter.get('/:id', Controller.getNoteById)

  notesRouter.post('/', Controller.postNotes)

  notesRouter.delete('/:id', Controller.deleteNoteById)

  return notesRouter
}
