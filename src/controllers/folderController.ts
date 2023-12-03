import { PriorityQueue } from '../../Structures/ColaPrioritaria/QueuePriority'
import { Request as ExpressRequest, Response } from 'express'

interface Request extends ExpressRequest {
  user?: any
}
export class FolderController {
  notesModel: any
  constructor ({ notesModel }: { notesModel: any }) {
    this.notesModel = notesModel
  }

  createFolder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { uid } = req.user
      const allFolder = await this.notesModel.createFolder({ data: req.body, uid })
      res.status(200).json(allFolder)
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }

  getAllFolders = async (_req: Request, res: Response): Promise<void> => {
    try {
      const allFolder = await this.notesModel.getAllFolders()
      const queue = new PriorityQueue(allFolder)
      const dataFolder = queue.items
      res.status(200).json(dataFolder)
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }

  deleteFolder = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      await this.notesModel.deleteFolder({ id })
      res.status(200).json({ message: 'folder deleted' })
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }

  getAllNotesAndFolders = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const data = await this.notesModel.getAllNotesandFoldersbyUser({
        data: req.user
      })
      res.status(200).json(data)
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }

  reunionExists = async (req: Request, res: Response): Promise<void> => {
    try {
      const { idReunion } = req.body
      this.notesModel.checkReunion(idReunion)
      res.status(200).json()
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }
}
