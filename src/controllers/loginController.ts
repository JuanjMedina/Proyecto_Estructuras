import { Request, Response } from 'express'

export class LoginController {
  notesModel: any
  constructor ({ notesModel }: { notesModel: any }) {
    this.notesModel = notesModel
  }

  getTokentoUser = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: 'ok' })
  }
}
