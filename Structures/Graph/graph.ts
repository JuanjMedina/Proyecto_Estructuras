import { Queue } from '../cola/queue'

export class Node<T> {
  data: T
  adjacent: Array<Node<T>>
  comparator: (a: T, b: T) => number
  constructor (data: T, comparator: (a: T, b: T) => number) {
    this.data = data
    this.adjacent = []
    this.comparator = comparator
  }

  addAdjacent (node: Node<T>): void {
    this.adjacent.push(node)
  }

  removeAdjacent (data: T): Node<T> | null {
    const index = this.adjacent.findIndex(
      (node) => this.comparator(node.data, data) === 0
    )
    if (index > -1) {
      return this.adjacent.splice(index, 1)[0]
    }
    return null
  }
}
export class Graph<T> {
  nodes: Map<T, Node<T>> = new Map()
  comparator: (a: T, b: T) => number
  constructor (comparator: (a: T, b: T) => number) {
    this.comparator = comparator
  }
  /**
     * Add a new node if it was not added before
     *
     * @param {T} data
     * @returns {Node<T>}
     */

  addNode (data: T): Node<T> {
    let node = this.nodes.get(data)
    if (node != null) return node
    node = new Node(data, this.comparator)
    this.nodes.set(data, node)

    return node
  }

  /**
     * Remove a node, also remove it from other nodes adjacency list
     *
     * @param {T} data
     * @returns {Node<T> | null}
     */
  removeNode (data: T): Node<T> | null {
    const nodeToRemove = this.nodes.get(data)

    if (nodeToRemove == null) return null

    this.nodes.forEach((node) => {
      node.removeAdjacent(nodeToRemove.data)
    })
    this.nodes.delete(data)

    return nodeToRemove
  }

  /**
     * Create an edge between two nodes
     *
     * @param {T} source
     * @param {T} destination
     */
  addEdge (source: T, destination: T): void {
    const sourceNode = this.addNode(source)
    const destinationNode = this.addNode(destination)

    sourceNode.addAdjacent(destinationNode)
  }
  /**
     * Remove an edge between two nodes
     *
     * @param {T} source
     * @param {T} destination
     */

  removeEdge (source: T, destination: T): void {
    const sourceNode = this.nodes.get(source)
    const destinationNode = this.nodes.get(destination)

    if (sourceNode != null && destinationNode != null) {
      sourceNode.removeAdjacent(destination)
    }
  }

  /**
     * Depth-first search
     *
     * @param {T} data
     * @param {Map<T, boolean>} visited
     * @returns
     */
  private depthFirstSearchAux (node: Node<T>, visited: Map<T, boolean>): void {
    if (node == null) return

    visited.set(node.data, true)

    console.log(node.data)

    node.adjacent.forEach((item) => {
      if (!visited.has(item.data)) {
        this.depthFirstSearchAux(item, visited)
      }
    })
  }

  depthFirstSearch (): void {
    const visited: Map<T, boolean> = new Map()
    this.nodes.forEach((node) => {
      if (!visited.has(node.data)) {
        this.depthFirstSearchAux(node, visited)
      }
    })
  }

  /**
     * Breadth-first search
     *
     * @param {T} data
     * @returns
     */
  private breadthFirstSearchAux (node: Node<T>, visited: Map<T, boolean>): void {
    const queue: Queue<Node<T>> = new Queue()

    if (node == null) return

    queue.enqueue(node)
    visited.set(node.data, true)

    while (!queue.list.isEmpty()) {
      node = queue.dequeue()

      if (node == null) continue

      console.log(node.data)

      node.adjacent.forEach((item) => {
        if (!visited.has(item.data)) {
          visited.set(item.data, true)
          queue.enqueue(item)
        }
      })
    }
  }

  breadthFirstSearch (): void {
    const visited: Map<T, boolean> = new Map()
    this.nodes.forEach((node) => {
      if (!visited.has(node.data)) {
        this.breadthFirstSearchAux(node, visited)
      }
    })
  }
}

function comparator (a: number, b: number): number {
  if (a < b) return -1

  if (a > b) return 1

  return 0
}

const graph = new Graph(comparator)
graph.addNode(1)
graph.addNode(2)
graph.addNode(3)
graph.addNode(4)
graph.addNode(5)
graph.addNode(6)
graph.addNode(7)
graph.addNode(8)
graph.addNode(9)
graph.addNode(10)
graph.addEdge(1, 2)
graph.addEdge(2, 3)
graph.addEdge(3, 5)
graph.addEdge(5, 8)
console.log(graph)
graph.depthFirstSearch()
graph.breadthFirstSearch()
