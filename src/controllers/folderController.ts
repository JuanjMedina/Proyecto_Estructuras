import { Request, Response } from 'express-serve-static-core'

export class FolderController {
  notesModel: any
  constructor ({ notesModel }: { notesModel: any }) {
    this.notesModel = notesModel
  }

  createFolder = async (req: Request, res: Response): Promise<void> => {
    try {
      const allFolder = await this.notesModel.createFolder({ data: req.body })
      res.status(200).json(allFolder)
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }

  getAllFolders = async (_req: Request, res: Response): Promise<void> => {
    try {
      const allFolder = await this.notesModel.getAllFolders()
      res.status(200).json(allFolder)
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }

  deleteFolder = async (_req: Request, _res: Response): Promise<void> => {

  }
}
