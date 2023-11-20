import { Request, Response } from 'express'

export class LoginController {
  notesModel: any
  constructor ({ notesModel }: { notesModel: any }) {
    this.notesModel = notesModel
  }

  getTokentoUser = async (req: Request, res: Response): Promise<void> => {
    // const token = req.cookies
    const token = req.cookies.token
    console.log(token)
    res.status(200).json({ message: 'ok', token })
  }
}
