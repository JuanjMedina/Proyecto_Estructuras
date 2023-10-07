import { DoubleLinkedList } from '../doubleLinkedList/doubleLinkedLIst'
export class Queue<T> {
  list = new DoubleLinkedList<T>()

  enqueue (value: T): void {
    this.list.addEnd(value)
  }

  dequeue (): T {
    if (this.list.isEmpty()) {
      throw new Error('No hay elementos en la cola')
    }
    if (this.list.head == null) throw new Error('No hay elementos en la cola')
    const valueNodeHead = this.list.head?.value
    this.list.head = this.list.head?.next
    this.list.size--
    return valueNodeHead
  }

  size (): number {
    return this.list.size
  }
}
