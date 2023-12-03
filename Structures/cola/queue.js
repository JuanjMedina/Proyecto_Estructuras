"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
var doubleLinkedLIst_1 = require("../doubleLinkedList/doubleLinkedLIst");
var Queue = /** @class */ (function () {
    function Queue() {
        this.list = new doubleLinkedLIst_1.DoubleLinkedList();
    }
    Queue.prototype.enqueue = function (value) {
        this.list.addEnd(value);
    };
    Queue.prototype.dequeue = function () {
        var _a, _b;
        if (this.list.isEmpty()) {
            throw new Error('No hay elementos en la cola');
        }
        if (this.list.head == null)
            throw new Error('No hay elementos en la cola');
        var valueNodeHead = (_a = this.list.head) === null || _a === void 0 ? void 0 : _a.value;
        this.list.head = (_b = this.list.head) === null || _b === void 0 ? void 0 : _b.next;
        this.list.size--;
        return valueNodeHead;
    };
    Queue.prototype.size = function () {
        return this.list.size;
    };
    Queue.prototype.peek = function () {
        if (this.list.head == null) {
            throw new Error('No hay elementos en la cola');
        }
        return this.list.head.value;
    };
    return Queue;
}());
exports.Queue = Queue;
