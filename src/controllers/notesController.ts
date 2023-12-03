import { NextFunction, Request as ExpressRequest, Response } from 'express'
import { ConjuntoDisjunto } from '../../Structures/ConjuntosDisjuntos/Disjoinset'
import { AVLTree } from '../../Structures/AVL/Avl'
import { Stack } from '../../Structures/pila/stack'
import { notesHistory } from '../types'

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

  findNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { idNota } = req.body
      const consultas = []
      let resultados = []
      const FolderandNotes = await this.notesModel.getAllNotesandFolders()
      const comparadorIds = (a: number, b: number): number => {
        return a - b
      }
      const AVL = new AVLTree<number>(
        comparadorIds as (a: number, b: number) => number
      )
      for (const dataObject of FolderandNotes) {
        AVL.insert(dataObject.id_nota)
      }
      if (AVL.search(idNota)) {
        consultas.push(idNota)
        resultados = await this.notesModel.getNotesByIds(consultas)
      }
      console.log(resultados)
      res.json(resultados)
    } catch (e) {
      res.status(400).json({ message: 'Bad Request' })
    }
  }

  findNoteByString = async (req: Request, res: Response): Promise<void> => {
    try {
      const { stringBusqueda } = req.body
      const consultas = []
      let resultados = []
      const FolderandNotes = await this.notesModel.getAllNotesandFolders()
      for (const dataObject of FolderandNotes) {
        if ((dataObject.tema_nota as string).includes(stringBusqueda)) {
          consultas.push(dataObject.id_nota)
          console.log(dataObject.id_nota)
        }
      }
      resultados = await this.notesModel.getNotesByIds(consultas)
      res.status(200).json(resultados)
    } catch (e) {
      res.status(400).json({ message: 'Error en la búsqueda' })
    }
  }

  getNotesHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const historialNotas = await this.notesModel.getHistorial({
        data: req.user
      })
      const stackHistorial = new Stack<notesHistory>()
      for (const dataObject of historialNotas) {
        stackHistorial.push(dataObject)
      }
      const historialNotasArray = []
      while (stackHistorial.size() > 0) {
        historialNotasArray.push(stackHistorial.pop())
      }
      res.status(200).json(historialNotasArray)
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
  }
}
