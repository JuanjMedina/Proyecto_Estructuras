"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleLinkedList = void 0;
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    isEmpty() {
        return this.size === 0;
    }
    addEnd(value) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            if (this.tail != null) {
                newNode.prev = this.tail;
                this.tail.next = newNode;
                this.tail = newNode;
            }
            else {
                throw new Error('Double LinkedList is empty');
            }
        }
        this.size++;
    }
    Size() {
        return this.size;
    }
    change(startPosition, finalPosition) {
        if (this.isEmpty()) {
            throw new Error('Double LinkedList is empty');
        }
        else if (startPosition < 0 ||
            finalPosition < 0 ||
            startPosition >= this.size ||
            finalPosition >= this.size ||
            startPosition === finalPosition) {
            throw new Error('Invalid position');
        }
        let currentNode = this.head; // Nodo actual que queremos encontrar
        let currentIndex = 0;
        let nodeToMove = null;
        while (currentNode !== null && currentIndex < startPosition) {
            currentNode = currentNode.next;
            currentIndex++;
        }
        if (currentNode === null) {
            throw new Error('Invalid start position');
        }
        nodeToMove = currentNode;
        if (currentNode.prev !== null) {
            currentNode.prev.next = currentNode.next;
        }
        else {
            this.head = currentNode.next;
        }
        if (currentNode.next !== null) {
            currentNode.next.prev = currentNode.prev;
        }
        else {
            this.tail = currentNode.prev;
        }
        currentNode = this.head;
        currentIndex = 0;
        while (currentNode !== null && currentIndex < finalPosition) {
            currentNode = currentNode.next;
            currentIndex++;
        }
        if (currentNode === null) {
            this.tail = nodeToMove;
            nodeToMove.next = null;
            nodeToMove.prev = this.tail;
            this.tail.next = nodeToMove;
        }
        else {
            nodeToMove.next = currentNode;
            nodeToMove.prev = currentNode.prev;
            if (currentNode.prev !== null) {
                currentNode.prev.next = nodeToMove;
            }
            else {
                this.head = nodeToMove;
            }
            currentNode.prev = nodeToMove;
        }
    }
    deleteEnd() {
        if (this.isEmpty()) {
            return null;
        }
        else {
            if (this.tail === null)
                throw new Error('Double LinkedList is empty');
            const value = this.tail.value;
            this.tail = this.tail.prev;
            if (this.tail !== null) {
                this.tail.next = null;
            }
            else {
                this.head = null;
            }
            this.size--;
            return value;
        }
    }
}
exports.DoubleLinkedList = DoubleLinkedList;
