import { Notes } from '../../src/types'
class TreeNode {
  value: Notes
  left: TreeNode | null
  right: TreeNode | null

  constructor (value: Notes) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export class BinarySearchTree {
  root: TreeNode | null

  constructor () {
    this.root = null
  }

  insert (value: Notes): void {
    const newNode = new TreeNode(value)

    if (this.root === null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  private insertNode (node: TreeNode, newNode: TreeNode): void {
    if (this.convertStringtoASCII(newNode.value.titulo) < this.convertStringtoASCII(node.value.titulo)) {
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

  search (value: Notes): boolean {
    return this.searchNodebyTitle(this.root, value)
  }

  private searchNodebyTitle (node: TreeNode | null, value: Notes): boolean {
    if (node === null) {
      return false
    }

    if (value.titulo === node.value.titulo) {
      return true
    } else if (this.convertStringtoASCII(value.titulo) < this.convertStringtoASCII(node.value.titulo)) {
      return this.searchNodebyTitle(node.left, value)
    } else {
      return this.searchNodebyTitle(node.right, value)
    }
  }

  /* minValue (): TreeNode | null {
    if (this.root == null) {
      return null
    }

    let current = this.root
    while (current.left !== null) {
      current = current.left
    }
    return current.value
  } */

  delete (value: Notes): void {
    this.root = this.deleteNode(this.root, value)
  }

  private deleteNode (node: TreeNode | null, value: Notes): TreeNode | null {
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

  private findMinValue (node: TreeNode): Notes {
    if (node.left === null) {
      return node.value
    }
    return this.findMinValue(node.left)
  }

  private convertStringtoASCII (string: String): number {
    const array = new Array(string.length)
    for (let index = 0; index < string.length; index++) {
      array[index] = string.charCodeAt(index)
    }
    const result = parseInt(array.join(''))
    return result
  }
}
