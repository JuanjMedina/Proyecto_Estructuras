import { Request, Response } from "express"
import { Queue } from "../../../Structures/cola/queue"
import { DoubleLinkedList } from "../../../Structures/doubleLinkedList/doubleLinkedLIst"
// import { Stack } from "../../../Structures/pila/stack"

export const stackFunction =  (_req:Request,_res:Response)=> {
    console.time('Aqui inicia')
    let n: number = 0
    while (n < 1000) {
        n++
    }
    console.timeEnd('Aqui Termina')
}
export const queueFunction =  (_req:Request,_res:Response)=> {
  console.log('HOla dadadads')
  
  Queue
}
export const doubleLinkedListFunction =  ()=> {
  DoubleLinkedList
}
