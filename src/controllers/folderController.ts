import { PriorityQueue } from '../../Structures/ColaPrioritaria/QueuePriority'
import { Request, Response } from 'express'
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
}
