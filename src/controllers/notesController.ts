import { Request, Response } from 'express-serve-static-core'

export class NotesController {
  notesModel: any
  constructor ({ notesModel }: { notesModel: any }) {
    this.notesModel = notesModel
  }

  getAllNotes = async (_req: Request, res: Response): Promise<void> => {
    try {
      const allNotes = await this.notesModel.getAllNotes()
      res.status(200).json(allNotes)
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }

  createNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const newNote = await this.notesModel.createNote({ data: req.body })
      res.status(201).json(newNote)
    } catch {
      res.status(400).json({ message: 'error' })
    }
  }
}
