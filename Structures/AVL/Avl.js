"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVLTree = exports.TreeNode = void 0;
var TreeNode = /** @class */ (function () {
    function TreeNode(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
    return TreeNode;
}());
exports.TreeNode = TreeNode;
var AVLTree = /** @class */ (function () {
    function AVLTree(comparador) {
        this.root = null;
        this.comparador = comparador;
    }
    AVLTree.prototype.getHeight = function (node) {
        return node != null ? node.height : 0;
    };
    AVLTree.prototype.updateHeight = function (node) {
        node.height =
            Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    };
    AVLTree.prototype.getBalanceFactor = function (node) {
        return node != null
            ? this.getHeight(node.left) - this.getHeight(node.right)
            : 0;
    };
    AVLTree.prototype.rotateRight = function (y) {
        var x = y.left;
        var T2 = x.right;
        x.right = y;
        y.left = T2;
        this.updateHeight(y);
        this.updateHeight(x);
        return x;
    };
    AVLTree.prototype.rotateLeft = function (x) {
        var y = x.right;
        var T2 = y.left;
        y.left = x;
        x.right = T2;
        this.updateHeight(x);
        this.updateHeight(y);
        return y;
    };
    AVLTree.prototype.balance = function (node) {
        if (node == null)
            return null;
        this.updateHeight(node);
        var balance = this.getBalanceFactor(node);
        if (balance > 1) {
            if (this.getBalanceFactor(node.left) < 0) {
                node.left = this.rotateLeft(node.left);
            }
            return this.rotateRight(node);
        }
        if (balance < -1) {
            if (this.getBalanceFactor(node.right) > 0) {
                node.right = this.rotateRight(node.right);
            }
            return this.rotateLeft(node);
        }
        return node;
    };
    AVLTree.prototype.insert = function (value) {
        this.root = this.insertNode(this.root, value);
    };
    AVLTree.prototype.insertNode = function (node, value) {
        if (node == null) {
            return new TreeNode(value);
        }
        var comparacion = this.comparador(value, node.value);
        if (comparacion < 0) {
            node.left = this.insertNode(node.left, value);
        }
        else if (comparacion > 0) {
            node.right = this.insertNode(node.right, value);
        }
        else {
            return node; // Duplicate values are not allowed
        }
        this.updateHeight(node);
        return this.balance(node);
    };
    AVLTree.prototype.search = function (value) {
        return this.searchNode(this.root, value);
    };
    AVLTree.prototype.searchNode = function (node, value) {
        if (node === null) {
            return false;
        }
        var comparacion = this.comparador(value, node.value);
        if (comparacion === 0) {
            return true;
        }
        else if (comparacion < 0) {
            return this.searchNode(node.left, value);
        }
        else {
            return this.searchNode(node.right, value);
        }
    };
    AVLTree.prototype.minValue = function () {
        if (this.root == null) {
            return null;
        }
        var current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    };
    AVLTree.prototype.delete = function (value) {
        this.root = this.deleteNode(this.root, value);
    };
    AVLTree.prototype.deleteNode = function (node, value) {
        if (node == null)
            return node;
        var comparacion = this.comparador(value, node.value);
        if (comparacion < 0) {
            node.left = this.deleteNode(node.left, value);
        }
        else if (comparacion > 0) {
            node.right = this.deleteNode(node.right, value);
        }
        else {
            if (node.left == null && node.right == null) {
                return null;
            }
            else if (node.right == null) {
                node = node.left;
            }
            else {
                var minValue = this.findMinValue(node.right);
                node.value = minValue;
                node.right = this.deleteNode(node.right, minValue);
            }
            return node;
        }
        return this.balance(node);
    };
    AVLTree.prototype.findMinValue = function (node) {
        if (node.left === null) {
            return node.value;
        }
        return this.findMinValue(node.left);
    };
    AVLTree.prototype.find = function (node, value) {
        if (node == null) {
            return null;
        }
        if (value === node.value) {
            return node;
        }
        else if (value < node.value) {
            return this.find(node.left, value);
        }
        else {
            return this.find(node.right, value);
        }
    };
    AVLTree.prototype.inOrderTraversal = function (node) {
        var temp = node;
        if (temp != null) {
            this.inOrderTraversal(temp.left);
            console.log(temp.value);
            this.inOrderTraversal(temp.right);
        }
    };
    AVLTree.prototype.preOrderTraversal = function (node) {
        var temp = node;
        if (temp != null) {
            console.log(temp.value);
            this.preOrderTraversal(temp.left);
            this.preOrderTraversal(temp.right);
        }
    };
    AVLTree.prototype.postOrderTraversal = function (node) {
        var temp = node;
        if (temp != null) {
            this.postOrderTraversal(temp.left);
            this.postOrderTraversal(temp.right);
            console.log(temp.value);
        }
    };
    return AVLTree;
}());
exports.AVLTree = AVLTree;
