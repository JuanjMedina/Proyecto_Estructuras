'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.createNotesRouter = void 0
const express_1 = require('express')
const Controller_1 = require('../controllers/Controller')
const createNotesRouter = ({ notesModel }) => {
  const notesController = new Controller_1.NotesController({ notesModel })
  const notesRouter = (0, express_1.Router)()
  notesRouter.get('/', notesController.getNotes)
  notesRouter.post('/')
  notesRouter.get('/:id')
  notesRouter.delete('/:id')
  return notesRouter
}
exports.createNotesRouter = createNotesRouter
