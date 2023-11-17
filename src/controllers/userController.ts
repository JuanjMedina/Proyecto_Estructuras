import { Request, Response } from 'express'

export class UserController {
  notesModel: any
  constructor ({ notesModel }: { notesModel: any }) {
    this.notesModel = notesModel
  }

  CreateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const newPerson = await this.notesModel.createUser({ data: req.body })
      res.status(201).json(newPerson)
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }

  getAllUser = async (_req: Request, res: Response): Promise<void> => {
    try {
      const allUsers = await this.notesModel.getAllUser()
      res.status(200).json(allUsers)
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      await this.notesModel.deleteUser({ id })
      res.status(200).json({ message: 'User deleted' })
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }
}
