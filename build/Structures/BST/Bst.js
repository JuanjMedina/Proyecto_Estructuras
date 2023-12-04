"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinarySearchTree = void 0;
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
        }
        else {
            this.insertNode(this.root, newNode);
        }
    }
    insertNode(node, newNode) {
        if (this.convertStringtoASCII(newNode.value.titulo) < this.convertStringtoASCII(node.value.titulo)) {
            if (node.left === null) {
                node.left = newNode;
            }
            else {
                this.insertNode(node.left, newNode);
            }
        }
        else {
            if (node.right === null) {
                node.right = newNode;
            }
            else {
                this.insertNode(node.right, newNode);
            }
        }
    }
    search(value) {
        return this.searchNodebyTitle(this.root, value);
    }
    searchNodebyTitle(node, value) {
        if (node === null) {
            return false;
        }
        if (value.titulo === node.value.titulo) {
            return true;
        }
        else if (this.convertStringtoASCII(value.titulo) < this.convertStringtoASCII(node.value.titulo)) {
            return this.searchNodebyTitle(node.left, value);
        }
        else {
            return this.searchNodebyTitle(node.right, value);
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
    delete(value) {
        this.root = this.deleteNode(this.root, value);
    }
    deleteNode(node, value) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        }
        else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        }
        else {
            if (node.left === null && node.right === null) {
                node = null;
            }
            else if (node.left === null) {
                node = node.right;
            }
            else if (node.right === null) {
                node = node.left;
            }
            else {
                const minValue = this.findMinValue(node.right);
                node.value = minValue;
                node.right = this.deleteNode(node.right, minValue);
            }
        }
        return node;
    }
    findMinValue(node) {
        if (node.left === null) {
            return node.value;
        }
        return this.findMinValue(node.left);
    }
    convertStringtoASCII(string) {
        const array = new Array(string.length);
        for (let index = 0; index < string.length; index++) {
            array[index] = string.charCodeAt(index);
        }
        const result = parseInt(array.join(''));
        return result;
    }
}
exports.BinarySearchTree = BinarySearchTree;
