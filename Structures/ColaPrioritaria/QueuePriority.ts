export class PriorityQueue<T> {
  readonly items: T[] = []

  constructor (initialItems: T[]) {
    this.items = initialItems
    this.sortItems()
  }

  enqueue (item: T): void {
    this.items.push(item)
    this.sortItems()
  }

  dequeue (): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }

    return this.items.shift()
  }

  peek (): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }

    return this.items[0]
  }

  isEmpty (): boolean {
    return this.items.length === 0
  }

  size (): number {
    return this.items.length
  }

  private sortItems (): void {
    this.items.sort((a: any, b: any) => {
      const dateA = new Date(a.created)
      const dateB = new Date(b.created)
      if (dateA < dateB) {
        return 1
      }
      if (dateA > dateB) {
        return -1
      }
      return 0
    })
  }
}
