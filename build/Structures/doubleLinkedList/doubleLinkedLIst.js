"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doubleLinkedList = void 0;
class node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
class doubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    isEmpty() {
        return this.size == 0;
    }
    addEnd(value) {
        const newNode = new node(value);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
    Size() {
        return this.size;
    }
}
exports.doubleLinkedList = doubleLinkedList;
