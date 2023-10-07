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
}
exports.DoubleLinkedList = DoubleLinkedList;
