import { Request as ExpressRequest, Response } from 'express'

interface Request extends ExpressRequest {
  user?: any
}

export class LoginController {
  notesModel: any
  constructor ({ notesModel }: { notesModel: any }) {
    this.notesModel = notesModel
  }

  getTokentoUser = async (_req: Request, res: Response): Promise<void> => {
    res.cookie('token', 'token')
    res.status(200).json({ message: 'ok' })
  }
}
