"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
class PriorityQueue {
    constructor(initialItems) {
        this.items = [];
        this.items = initialItems;
        this.sortItems();
    }
    enqueue(item) {
        this.items.push(item);
        this.sortItems();
    }
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.shift();
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
    sortItems() {
        this.items.sort((a, b) => {
            const dateA = new Date(a.created);
            const dateB = new Date(b.created);
            if (dateA < dateB) {
                return 1;
            }
            if (dateA > dateB) {
                return -1;
            }
            return 0;
        });
    }
}
exports.PriorityQueue = PriorityQueue;
