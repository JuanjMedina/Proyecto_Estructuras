"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const doubleLinkedLIst_1 = require("../doubleLinkedList/doubleLinkedLIst");
class Queue {
    constructor() {
        this.list = new doubleLinkedLIst_1.DoubleLinkedList();
    }
    enqueue(value) {
        this.list.addEnd(value);
    }
    dequeue() {
        var _a, _b;
        if (this.list.isEmpty()) {
            throw new Error('No hay elementos en la cola');
        }
        if (this.list.head == null)
            throw new Error('No hay elementos en la cola');
        const valueNodeHead = (_a = this.list.head) === null || _a === void 0 ? void 0 : _a.value;
        this.list.head = (_b = this.list.head) === null || _b === void 0 ? void 0 : _b.next;
        this.list.size--;
        return valueNodeHead;
    }
    size() {
        return this.list.size;
    }
    peek() {
        if (this.list.head == null) {
            throw new Error('No hay elementos en la cola');
        }
        return this.list.head.value;
    }
}
exports.Queue = Queue;
