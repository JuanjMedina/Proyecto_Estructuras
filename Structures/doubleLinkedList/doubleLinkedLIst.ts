class node<T> {
  value: T
  next: node<T> | null
  prev: node<T> | null
  constructor(value: T) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

export class doubleLinkedList<T> {
  head: node<T> | null
  tail: node<T> | null
  size: number

  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  isEmpty(): boolean {
    return this.size == 0
  }

  addEnd(value: T): void {
    const newNode = new node<T>(value)
    if (this.isEmpty()) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.prev = this.tail
      this.tail!.next = newNode 
      this.tail = newNode
    }
    this.size++
  }

  Size(): number {
    return this.size
  }
}
