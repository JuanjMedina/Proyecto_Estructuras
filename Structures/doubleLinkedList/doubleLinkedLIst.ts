class Node<T> {
  value: T
  next: Node<T> | null
  prev: Node<T> | null
  constructor (value: T) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

export class DoubleLinkedList<T> {
  head: Node<T> | null
  tail: Node<T> | null
  size: number

  constructor () {
    this.head = null
    this.tail = null
    this.size = 0
  }

  isEmpty (): boolean {
    return this.size === 0
  }

  addEnd (value: T): void {
    const newNode = new Node<T>(value)
    if (this.isEmpty()) {
      this.head = newNode
      this.tail = newNode
    } else {
      if (this.tail != null) {
        newNode.prev = this.tail
        this.tail.next = newNode
        this.tail = newNode
      } else {
        throw new Error('Double LinkedList is empty')
      }
    }
    this.size++
  }

  Size (): number {
    return this.size
  }
}
