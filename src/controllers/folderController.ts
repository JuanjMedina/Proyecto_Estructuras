import { Request, Response } from 'express-serve-static-core'

export class FolderController {
  notesModel: any
  constructor ({ notesModel }: { notesModel: any }) {
    this.notesModel = notesModel
  }

  CreateUser = async (_req: Request, _res: Response): Promise<void> => {}

  getAllUser = async (_req: Request, _res: Response): Promise<void> => {}

  deleteUser = async (_req: Request, _res: Response): Promise<void> => {}
}
