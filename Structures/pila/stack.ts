import { DoubleLinkedList } from '../doubleLinkedList/doubleLinkedLIst'
export class Stack<T> {
  list = new DoubleLinkedList<T>()

  push (value: T): void {
    this.list.addEnd(value)
  }

  pop (): T {
    if (this.list.tail != null) {
      const valueNodeTail = this.list.tail.value
      this.list.tail = this.list.tail.prev
      this.list.size--
      return valueNodeTail
    }
    throw new Error('No hay elementos en la cola')
  }

  size (): number {
    return this.list.size
  }
}
