export class PriorityQueue<T> {
  private readonly elements: Array<[T, number]> = []

  enqueue (item: T, priority: number): void {
    this.elements.push([item, priority])
    this.elements.sort((a, b) => a[1] - b[1])
  }

  dequeue (): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    if (this.isEmpty()) {
      return undefined
    }
    return this.elements.shift()?.[0]
  }

  peek (): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.elements[0][0]
  }

  isEmpty (): boolean {
    return this.elements.length === 0
  }

  size (): number {
    return this.elements.length
  }
}
