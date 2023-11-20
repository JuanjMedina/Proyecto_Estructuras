import { NextFunction, Request as ExpressRequest, Response } from 'express'
import { ConjuntoDisjunto } from '../../Structures/ConjuntosDisjuntos/Disjoinset'
import { AVLTree } from '../../Structures/AVL/Avl'

interface Request extends ExpressRequest {
  user?: any
}

export class NotesController {
  notesModel: any
  constructor ({ notesModel }: { notesModel: any }) {
    this.notesModel = notesModel
  }

  getAllNotes = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.user
      const { name, uid, email } = data
      console.log(name, uid, email)
      await this.notesModel.createUser({ data: req.user })
      const allNotes = await this.notesModel.getAllNotes({ data: req.user })
      res.status(200).json(allNotes)
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }

  createNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newNote = await this.notesModel.createNote({ data: req.body })
      res.status(201).json(newNote)
    } catch (error) {
      next(error)
    }
  }

  updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const { idNota, idCarpeta } = req.body
      const FolderandNotes = await this.notesModel.getAllNotesandFolders()
      const conjuntoDisjunto = new ConjuntoDisjunto()
      for (const dataObject of FolderandNotes) {
        conjuntoDisjunto.agregarNotaACarpeta(
          dataObject.id_nota,
          dataObject.id_carpeta
        )
        console.log(dataObject)
      }
      // console.log(conjuntoDisjunto)
      const result = await this.notesModel.updateNoteandFolder({
        //! falta logica
        dataNoteandFolder: req.body
      })
      conjuntoDisjunto.cambiarCarpetaDeNota(idNota, idCarpeta)
      // console.log(conjuntoDisjunto)
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }

  findNoteById = async (req: Request, res: Response): Promise <void> => {
    try {
      const { idNota } = req.body
      const FolderandNotes = await this.notesModel.getAllNotesandFolders()
      const comparadorIds = (a: number, b: number): number => {
        return a - b
      }
      const AVL = new AVLTree<number>(comparadorIds as (a: number, b: number) => number)
      for (const dataObject of FolderandNotes) {
        AVL.insert(dataObject.id_nota)
      }
      const result = AVL.search(idNota)
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: 'la embarraste jeronimo' })
    }
  }
}
