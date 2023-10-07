import { Request, Response } from 'express-serve-static-core'

export class UserController {
  notesModel: any
  constructor ({ notesModel }: { notesModel: any }) {
    this.notesModel = notesModel
  }

  CreateUser = async (req: Request, res: Response): Promise<void> => {
    const newPerson = await this.notesModel.createUser({ data: req.body })
    res.status(201).json(newPerson)
  }

  getAllUser = async (_req: Request, res: Response): Promise<void> => {
    const allUsers = await this.notesModel.getAllUser()
    res.status(200).json(allUsers)
  }

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    await this.notesModel.deleteUser({ id })
    res.status(200).json({ message: 'User deleted' })
  }
}
