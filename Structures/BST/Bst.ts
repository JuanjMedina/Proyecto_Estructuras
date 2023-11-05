class TreeNode<T> {
  value: T
  left: TreeNode<T> | null
  right: TreeNode<T> | null

  constructor (value: T) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export class BinarySearchTree<T> {
  root: TreeNode<T> | null

  constructor () {
    this.root = null
  }

  insert (value: T): void {
    const newNode = new TreeNode(value)

    if (this.root == null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  private insertNode (node: TreeNode<T>, newNode: TreeNode<T>): void {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  search (value: T): boolean {
    return this.searchNode(this.root, value)
  }

  private searchNode (node: TreeNode<T> | null, value: T): boolean {
    if (node === null) {
      return false
    }

    if (value === node.value) {
      return true
    } else if (value < node.value) {
      return this.searchNode(node.left, value)
    } else {
      return this.searchNode(node.right, value)
    }
  }

  minValue (): T | null {
    if (this.root == null) {
      return null
    }

    let current = this.root
    while (current.left !== null) {
      current = current.left
    }
    return current.value
  }

  delete (value: T): void {
    this.root = this.deleteNode(this.root, value)
  }

  private deleteNode (node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (node === null) {
      return null
    }

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value)
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value)
    } else {
      if (node.left === null && node.right === null) {
        node = null
      } else if (node.left === null) {
        node = node.right
      } else if (node.right === null) {
        node = node.left
      } else {
        const minValue = this.findMinValue(node.right)
        node.value = minValue
        node.right = this.deleteNode(node.right, minValue)
      }
    }

    return node
  }

  private findMinValue (node: TreeNode<T>): T {
    if (node.left === null) {
      return node.value
    }
    return this.findMinValue(node.left)
  }
}
