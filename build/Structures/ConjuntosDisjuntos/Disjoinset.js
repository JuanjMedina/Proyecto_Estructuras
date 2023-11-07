"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisjointSet = void 0;
class DisjointSet {
    constructor(size) {
        this.parent = new Array(size);
        this.rank = new Array(size);
        for (let i = 0; i < size; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX === rootY) {
            return false;
        }
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        }
        else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        }
        else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        return true;
    }
}
exports.DisjointSet = DisjointSet;
