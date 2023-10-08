import { Request, Response } from 'express'
import { Queue } from '../../../Structures/cola/queue'
import { DoubleLinkedList } from '../../../Structures/doubleLinkedList/doubleLinkedLIst'
import { Stack } from '../../../Structures/pila/stack'
import { Notes } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export const stackFunction = (_req: Request, res: Response) => {
  class record{
    stack: Stack<cambio> = new Stack<cambio>()

    buscarCambioTipo(tipoBuscado: cambioCosas): DoubleLinkedList<cambio> {
      const cambiosDelTipoBuscado = new DoubleLinkedList<cambio>
      const historialTemp = new Stack();
      while (this.stack.size() != 0){
          const cambio: cambio = this.stack.pop();
          historialTemp.push(cambio);
          if (cambio.cambios === tipoBuscado) {
              cambiosDelTipoBuscado.addEnd(cambio);
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

  let objects = 10000000

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
  class papelera{
    queue: Queue<Notes> = new Queue<Notes>()

    calcFechaEliminacion()  {
      const fechaActual = new Date();
      fechaActual.setDate(fechaActual.getDate() - 1); //Tenemos que hacer que las fechas hayan pasado para eliminarlo
      return fechaActual.toISOString(); 
    }

    agregarPapelera(nota: Notes) {
      nota.fechaEliminacion = this.calcFechaEliminacion()
      this.queue.enqueue(nota) //Al tener fechaEliminacion, indica que tienen que entrar a papelera   
    }

    borrarPapelera(nota: Notes) {
      if (nota.fechaEliminacion && new Date(nota.fechaEliminacion) < new Date()) {
        this.queue.dequeue()
      }
    }
  }

  let start = Date.now()
  let objects = 1000000
  const a = new papelera()

  const crearNotas = (): Notes => {
    const nota: Notes = {
      idNota: uuidv4(),
      titulo: "Nota de prueba",
      descripcion: "Esta es una nota de prueba",
      fecha: "2023-10-08",
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


export const doubleLinkedListFunction = () => {
  DoubleLinkedList
}
