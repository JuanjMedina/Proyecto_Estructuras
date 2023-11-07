"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
const doubleLinkedLIst_1 = require("../doubleLinkedList/doubleLinkedLIst");
class Stack {
    constructor() {
        this.list = new doubleLinkedLIst_1.DoubleLinkedList();
    }
    push(value) {
        this.list.addEnd(value);
    }
    pop() {
        if (this.list.tail != null) {
            const valueNodeTail = this.list.tail.value;
            this.list.tail = this.list.tail.prev;
            this.list.size--;
            return valueNodeTail;
        }
        throw new Error('No hay elementos en la cola');
    }
    size() {
        return this.list.size;
    }
}
exports.Stack = Stack;
