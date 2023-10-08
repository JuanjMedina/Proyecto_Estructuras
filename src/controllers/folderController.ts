import { Request, Response } from 'express-serve-static-core'

export class FolderController {
  notesModel: any
  constructor ({ notesModel }: { notesModel: any }) {
    this.notesModel = notesModel
  }

  CreateUser = async (req: Request, res: Response): Promise<void> => {}

  getAllUser = async (_req: Request, res: Response): Promise<void> => {}

  deleteUser = async (req: Request, res: Response): Promise<void> => {}
}
