import { Notes } from '../types'
import { Request, Response } from 'express-serve-static-core'

export class NotesController {
  notesModel: any
  constructor ({ notesModel }: { notesModel: any }) {
    this.notesModel = notesModel
  }

  getNotes = async (_req: Request, res: Response): Promise<void> => {
    const movies: Promise<Notes> = await this.notesModel.getAllNotes()
    res.json(movies)
  }
}
