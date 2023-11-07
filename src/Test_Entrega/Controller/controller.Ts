import { Request, Response } from 'express'
import { Queue } from '../../../Structures/cola/queue'
import { DoubleLinkedList } from '../../../Structures/doubleLinkedList/doubleLinkedLIst'
import { Stack } from '../../../Structures/pila/stack'
import { Folder, Notes, NotesandFolder } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import { PriorityQueue } from '../../../Structures/ColaPrioritaria/QueuePriority'
import { BinarySearchTree } from '../../../Structures/BST/Bst'
import { ConjuntoDisjunto } from '../../../Structures/ConjuntosDisjuntos/Disjoinset'

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
      fechaEliminacion: null, // Inicialmente no está en la papelera
      idFolder: null
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
      fechaEliminacion: null, // Inicialmente no está en la papelera
      idFolder: null
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
  const queue = new PriorityQueue(ArrayObjects) // encolar en la cola prioritaria
  for (let i = 0; i < queue.size(); i++) {
    // desencolar
    queue.dequeue()
  }

  let timeTaken = Date.now() - start
  res.json({
    message: 'Total time taken : ' + timeTaken + ' milliseconds',
    objets: objectData
  })
  console.log('Total time taken : ' + timeTaken + ' milliseconds')
}

export const bstFunction = (_req: Request, res: Response) => {
  function generateRandomDate() {
    const minTimestamp = 0
    const maxTimestamp = Date.now()
    const randomTimestamp = Math.floor(
      Math.random() * (maxTimestamp - minTimestamp + 1) + minTimestamp
    )
    const randomDate = new Date(randomTimestamp)
    return randomDate
  }

  const start = Date.now()
  const objectData1 = 100
  const objectData2 = 1000
  const carpetas: Folder[] = []
  const notas: Notes[] = []

  const createFolder = (): Folder => {
    const folder: Folder = {
      idCarpeta: 0,
      nombre: '',
      created: generateRandomDate()
    }
    return folder
  }

  const createNotas = (): Notes => {
    const nota: Notes = {
      idNota: uuidv4(),
      titulo: '',
      descripcion: 'Esta es una nota de prueba',
      fecha: '2023-10-08',
      fechaEliminacion: null, // Inicialmente no está en la papelera
      idFolder: null
    }
    return nota
  }

  for (let index = 0; index < objectData1; index++) {
    const folder = createFolder()
    folder.idCarpeta = index
    folder.nombre = `Carpeta de prueba ${index}`
    carpetas.push(folder)
  }

  for (let index = 0; index < objectData2; index++) {
    const nota = createNotas()
    nota.idFolder = Math.floor(Math.random() * objectData1)
    nota.titulo = `Nota de prueba ${index}`
    notas.push(nota)
  }

  const resultados = []

  for (let index = 0; index < carpetas.length; index++) {
    const arbolNotas: BinarySearchTree = new BinarySearchTree()
    notas.forEach((nota) => {
      if (nota.idFolder === index) {
        arbolNotas.insert(nota)
      }
    })
    if (arbolNotas.search(notas[1])) {
      resultados.push(carpetas[index].nombre)
    }
  }

  const timeTaken = Date.now() - start

  res.json({
    message: `Total time taken, ${timeTaken}`,
    Notes: notas[1],
    results: resultados,
    objets: objectData2
  })
}

export const ConjuntoDisjuntoFunction = (_req: Request, res: Response) => {
  let start = Date.now()
  let objectData = 10000
  const conjuntosDisjuntos = new ConjuntoDisjunto()  

  // Insertar a la estructura
  for(let i = 0; i < objectData; i++){
    const folder: NotesandFolder = {
      idNota: i,
      titulo: 'Nota de prueba',
      descripcion: 'Esta es una nota de prueba',
      idFolder:i,
      idCarpeta:i,
      nombre: 'Carpeta de prueba',
    }
    conjuntosDisjuntos.agregarNotaACarpeta(folder.idNota, folder.idCarpeta)
  }


  // Cambiar nota de carpeta
  for(let i = 0; i < objectData; i++){
    conjuntosDisjuntos.cambiarCarpetaDeNota(i,Math.floor(Math.random() * 101 ))
  }

  // // Obtener carpeta de nota
  // for(let i = 0; i < objectData; i++){
  // conjuntosDisjuntos.obtenerCarpetaDeNota(i)
  // }



  let timeTaken = Date.now() - start
  res.json({
    message: 'Total time taken : ' + timeTaken + ' milliseconds',
    objets: objectData
  })
  console.log('Total time taken : ' + timeTaken + ' milliseconds')
}
