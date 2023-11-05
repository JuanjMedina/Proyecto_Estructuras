class TreeNode<T> {
  value: T
  left: TreeNode<T> | null
  right: TreeNode<T> | null
  height: number

  constructor (value: T) {
    this.value = value
    this.left = null
    this.right = null
    this.height = 1
  }
}

export class AVLTree<T> {
  root: TreeNode<T> | null

  constructor () {
    this.root = null
  }

  private getHeight (node: TreeNode<T> | null): number {
    return node != null ? node.height : 0
  }

  private updateHeight (node: TreeNode<T>): void {
    node.height =
      Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1
  }

  private getBalanceFactor (node: TreeNode<T> | null): number {
    return node != null
      ? this.getHeight(node.left) - this.getHeight(node.right)
      : 0
  }

  private rotateRight (y: TreeNode<T>): TreeNode<T> {
    const x = y.left as TreeNode<T>
    const T2 = x.right

    x.right = y
    y.left = T2

    this.updateHeight(y)
    this.updateHeight(x)

    return x
  }

  private rotateLeft (x: TreeNode<T>): TreeNode<T> {
    const y = x.right as TreeNode<T>
    const T2 = y.left

    y.left = x
    x.right = T2

    this.updateHeight(x)
    this.updateHeight(y)

    return y
  }

  private balance (node: TreeNode<T> | null): TreeNode<T> | null {
    if (node == null) return null

    this.updateHeight(node)

    const balance = this.getBalanceFactor(node)

    if (balance > 1) {
      if (this.getBalanceFactor(node.left) < 0) {
        node.left = this.rotateLeft(node.left as TreeNode<T>)
      }
      return this.rotateRight(node)
    }
    if (balance < -1) {
      if (this.getBalanceFactor(node.right) > 0) {
        node.right = this.rotateRight(node.right as TreeNode<T>)
      }
      return this.rotateLeft(node)
    }

    return node
  }

  insert (value: T): void {
    this.root = this.insertNode(this.root, value)
  }

  private insertNode (node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (node == null) {
      return new TreeNode(value)
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value)
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value)
    } else {
      return node // Duplicate values are not allowed
    }
    this.balance(node)
    return this.balance(node) as TreeNode<T>
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
    if (node == null) return node

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value)
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value)
    } else {
      // if (node.left == null || node.right == null) {
      //   // node = node.left != null || node.right
      //   node = node.left != null ? node.left : node.right
      // } else {
      //   const minValue = this.findMinValue(node.right)
      //   node.value = minValue
      //   node.right = this.deleteNode(node.right, minValue)
      // }
    }

    return this.balance(node)
  }

  private findMinValue (node: TreeNode<T>): T {
    if (node.left === null) {
      return node.value
    }
    return this.findMinValue(node.left)
  }

  inOrderTraversal (node: TreeNode<T> | null): void {
    const temp = node
    if (temp != null) {
      this.inOrderTraversal(temp.left)
      console.log(temp.value)
      this.inOrderTraversal(temp.right)
    }
  }

  preOrderTraversal (node: TreeNode<T> | null): void {
    const temp = node
    if (temp != null) {
      console.log(temp.value)
      this.inOrderTraversal(temp.left)
      this.inOrderTraversal(temp.right)
    }
  }

  postOrderTraversal (node: TreeNode<T> | null): void {
    const temp = node
    if (temp != null) {
      this.inOrderTraversal(temp.left)
      this.inOrderTraversal(temp.right)
      console.log(temp.value)
    }
  }
}
