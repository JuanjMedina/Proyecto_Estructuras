import { Request, Response } from 'express'
import { Queue } from '../../../Structures/cola/queue'
import { DoubleLinkedList } from '../../../Structures/doubleLinkedList/doubleLinkedLIst'
import { Stack } from '../../../Structures/pila/stack'
import { Folder, Notes } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import { PriorityQueue } from '../../../Structures/ColaPrioritaria/QueuePriority'
import { AVLTree} from '../../../Structures/AVL/Avl'

export const stackFunction = (_req: Request, res: Response) => {
  class record {
    stack: Stack<cambio> = new Stack<cambio>()

    buscarCambioTipo(tipoBuscado: cambioCosas): DoubleLinkedList<cambio> {
      const cambiosDelTipoBuscado = new DoubleLinkedList<cambio>()
      const historialTemp = new Stack()
      while (this.stack.size() != 0) {
        const cambio: cambio = this.stack.pop()
        historialTemp.push(cambio)
        if (cambio.cambios === tipoBuscado) {
          cambiosDelTipoBuscado.addEnd(cambio)
        }
      }
      return cambiosDelTipoBuscado
    }
  }

  let start = Date.now()

  enum cambioCosas {
    'add',
    'delete',
    'create',
    'updated'
  }

  type cambio = {
    date: number
    cambios: cambioCosas
  }

  let objects = 1000

  let historial = new record()

  const crearObjetos = (): cambio => {
    const fecha: number = Date.now()
    const cambioRandom: number = Math.floor(Math.random() * 4)
    const changes: cambio = {
      date: fecha,
      cambios: cambioRandom
    }
    return changes
  }

  for (let index = 0; index < objects; index++) {
    const cambio = crearObjetos()
    historial.stack.push(cambio)
  }

  historial.buscarCambioTipo(cambioCosas.create)

  while (historial.stack.size() != 0) {
    historial.stack.pop()
  }

  let timeTaken = Date.now() - start
  res.json({ message: 'Total time taken : ' + timeTaken + ' milliseconds' })
  console.log('Total time taken : ' + timeTaken + ' milliseconds')
}

export const queueFunction = (_req: Request, res: Response) => {
  class papelera {
    queue: Queue<Notes> = new Queue<Notes>()

    calcFechaEliminacion() {
      const fechaActual = new Date()
      fechaActual.setDate(fechaActual.getDate() - 1) //Tenemos que hacer que las fechas hayan pasado para eliminarlo
      return fechaActual.toISOString()
    }

    agregarPapelera(nota: Notes) {
      nota.fechaEliminacion = this.calcFechaEliminacion()
      this.queue.enqueue(nota) //Al tener fechaEliminacion, indica que tienen que entrar a papelera
    }

    borrarPapelera(nota: Notes) {
      if (
        nota.fechaEliminacion &&
        new Date(nota.fechaEliminacion) < new Date()
      ) {
        this.queue.dequeue()
      }
    }
  }

  let start = Date.now()
  let objects = 1000
  const a = new papelera()

  const crearNotas = (): Notes => {
    const nota: Notes = {
      idNota: uuidv4(),
      titulo: 'Nota de prueba',
      descripcion: 'Esta es una nota de prueba',
      fecha: '2023-10-08',
      fechaEliminacion: null // Inicialmente no está en la papelera
    }
    return nota
  }

  for (let index = 0; index < objects; index++) {
    const nota = crearNotas()
    a.agregarPapelera(nota)
  }

  for (let index = 0; index < objects; index++) {
    a.borrarPapelera(a.queue.peek())
  }

  let timeTaken = Date.now() - start
  res.json({ message: 'Total time taken : ' + timeTaken + ' milliseconds' })
  console.log('Total time taken : ' + timeTaken + ' milliseconds')
}
const crearNotas = (): Notes => {
  const nota: Notes = {
    idNota: uuidv4(),
    titulo: 'Nota de prueba',
    descripcion: 'Esta es una nota de prueba',
    fecha: '2023-10-08',
    fechaEliminacion: null // Inicialmente no está en la papelera
  }
  return nota
}
class AvlFolder {
    notaPrueba: Notes = crearNotas()
    comparadorNotas = (a: Notes, b: Notes): number => {
      if (a.idNota < b.idNota) return -1
      else if (a.idNota > b.idNota) return 1
      return 0
    }
    AVLTree = new AVLTree<Notes>(this.comparadorNotas);
    value: number = 0
    constructor(value: number) {
      this.value = value
    }
  
    insertNote(nota: Notes) {
      this.AVLTree.insert(nota)
    }
    findNote(idNota: string): Notes | null {
      this.notaPrueba.idNota = idNota
      const notaRespuesta = this.AVLTree.find(this.AVLTree.root, this.notaPrueba)
      if (notaRespuesta) {
        return notaRespuesta.value;
      } else {
        return null;
      }
    }
  }

export const doubleLinkedListFunction = (_req: Request, res: Response) => {
  class Folder {
    DoubleLinkedList = new DoubleLinkedList<Notes>()

    addLinkedList(Nota: Notes) {
      // Nota: Notes
      this.DoubleLinkedList.addEnd(Nota)
      // this.DoubleLinkedList.addEnd(number)
    }

    changePosition(inicialPos: number, finalPos: number) {
      this.DoubleLinkedList.change(inicialPos, finalPos)
    }
  }

  const Gennumber = (min: number = 0, max: number = objectData) => {
    const randomDecimal = Math.random()
    const RandomNumber = Math.floor(randomDecimal * (max - min)) + min
    return RandomNumber
  }

  let start = Date.now()
  let objectData = 100000

  const crearNotas = (): Notes => {
    const nota: Notes = {
      idNota: uuidv4(),
      titulo: 'Nota de prueba',
      descripcion: 'Esta es una nota de prueba',
      fecha: '2023-10-08',
      fechaEliminacion: null // Inicialmente no está en la papelera
    }
    return nota
  }

  // const genNumberTest = (): number => {
  //   const randomDecimal = Math.random()
  //   const randomNumber = Math.floor(randomDecimal * 100) + 1
  //   return randomNumber
  // }

  const folder = new Folder()

  for (let index = 1; index < objectData; index++) {
    const nota = crearNotas()
    // const number = genNumberTest()
    folder.addLinkedList(nota)
  }

  for (let index = 0; index < objectData / 2; index++) {
    folder.changePosition(index, Gennumber(0, objectData - 100))
  }

  for (let index = 0; index < objectData; index++) {
    folder.DoubleLinkedList.deleteEnd()
  }

  let timeTaken = Date.now() - start
  res.json({ message: 'Total time taken : ' + timeTaken + ' milliseconds' })
  console.log('Total time taken : ' + timeTaken + ' milliseconds')
}

export const priorityQueueFunction = (_req: Request, res: Response) => {
  function generateRandomDate() {
    const minTimestamp = 0
    const maxTimestamp = Date.now()
    const randomTimestamp = Math.floor(
      Math.random() * (maxTimestamp - minTimestamp + 1) + minTimestamp
    )
    const randomDate = new Date(randomTimestamp)
    return randomDate
  }

  let start = Date.now()
  let objectData = 100000

  const createFolder = () => {
    const folder: Folder = {
      idCarpeta: Math.floor(Math.random() * objectData),
      nombre: 'Carpeta de prueba',
      created: generateRandomDate()
    }
    return folder
  }
  const ArrayObjects = []
  for (let i = 0; i < objectData; i++) {
    const folder = createFolder()
    ArrayObjects.push(folder)
  }
  const queue = new PriorityQueue(ArrayObjects)
  for (let i = 0; i < queue.size(); i++) {
    queue.dequeue()
  }

  let timeTaken = Date.now() - start
  res.json({
    message: 'Total time taken : ' + timeTaken + ' milliseconds',
    objets:  objectData
  })
  console.log('Total time taken : ' + timeTaken + ' milliseconds')
}



const createTestNotes = () => {
  const folderList: AvlFolder[] = []
  const carpetas: number = 100
  const tasks: number = 900
  for (let i = 0; i < carpetas; i++) {
    const folder = new AvlFolder(i)
    folderList.push(folder)
  }
  for(let i = 0; i < tasks; i++){
    const nota: Notes = crearNotas() as Notes
    const randomFolder = Math.floor(Math.random() * carpetas )
    const folder = folderList[randomFolder]
    folder.insertNote(nota)
  }
  return folderList
}

const createTestIds = () => {
  const n: number = 1000
  const pruebas: string[] = []
  for (let i = 0; i < n; i++) {
    const id = uuidv4()
    pruebas.push(id)
  }
  return pruebas 
}

const testNotes = createTestNotes()

const testIds = createTestIds()

export const findNotesFunction = (_req: Request, res: Response) => {
  const resultados: DoubleLinkedList<Notes | null> = new DoubleLinkedList<Notes>
  let start = Date.now()
  for (let i = 0; i < 1000; i++) {
    const testFind = testIds[i]
    for (let j = 0; j < 100; i++) {
      const testFolder = testNotes[j]
      const res = testFolder.findNote(testFind)
      resultados.addEnd(res)
    }
  }
  let timeTaken = Date.now() - start
  res.json({
    message: 'Total time taken : ' + timeTaken + ' milliseconds',
    objects:  resultados
  })
  console.log('Total time taken : ' + timeTaken + ' milliseconds')
}


