import { Request, Response } from 'express'
import { Queue } from '../../../Structures/cola/queue'
import { DoubleLinkedList } from '../../../Structures/doubleLinkedList/doubleLinkedLIst'
import { Stack } from '../../../Structures/pila/stack'

export const stackFunction = (_req: Request, res: Response) => {

  let historial = new Stack()

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
  let start = Date.now()
  for (let index = 0; index < objects; index++) { // metemos la cantidad objects de cambios al historial
    const fecha = Date.now()
    const cambioRandom = Math.floor(Math.random() * 4)
    const changes: cambio = {
      date: fecha,
      cambios: cambioRandom
    }
    historial.push(changes)
  }

  /*const buscarCambioTipo = (historial: Stack<cambio>) => {
    const historialTemp = new Stack();
    while (historial.size() != 0){
        
    }
  }*/

  for (let index = 0; index < objects; index++) { // hacemos pop de todos los elementos en historial
    historial.pop();
  }

  let timeTaken = Date.now() - start
  res.json({ message: 'Total time taken : ' + timeTaken + ' milliseconds' })
  console.log('Total time taken : ' + timeTaken + ' milliseconds')

}
export const queueFunction = (_req: Request, _res: Response) => {
  console.log('HOla dadadads')

  Queue
}
export const doubleLinkedListFunction = () => {
  DoubleLinkedList
}
