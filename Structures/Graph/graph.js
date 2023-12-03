"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = exports.Node = void 0;
var queue_1 = require("../cola/queue");
var Node = /** @class */ (function () {
    function Node(data, comparator) {
        this.data = data;
        this.adjacent = [];
        this.comparator = comparator;
    }
    Node.prototype.addAdjacent = function (node) {
        this.adjacent.push(node);
    };
    Node.prototype.removeAdjacent = function (data) {
        var _this = this;
        var index = this.adjacent.findIndex(function (node) { return _this.comparator(node.data, data) === 0; });
        if (index > -1) {
            return this.adjacent.splice(index, 1)[0];
        }
        return null;
    };
    return Node;
}());
exports.Node = Node;
var Graph = /** @class */ (function () {
    function Graph(comparator) {
        this.nodes = new Map();
        this.comparator = comparator;
    }
    /**
       * Add a new node if it was not added before
       *
       * @param {T} data
       * @returns {Node<T>}
       */
    Graph.prototype.addNode = function (data) {
        var node = this.nodes.get(data);
        if (node != null)
            return node;
        node = new Node(data, this.comparator);
        this.nodes.set(data, node);
        return node;
    };
    /**
       * Remove a node, also remove it from other nodes adjacency list
       *
       * @param {T} data
       * @returns {Node<T> | null}
       */
    Graph.prototype.removeNode = function (data) {
        var nodeToRemove = this.nodes.get(data);
        if (nodeToRemove == null)
            return null;
        this.nodes.forEach(function (node) {
            node.removeAdjacent(nodeToRemove.data);
        });
        this.nodes.delete(data);
        return nodeToRemove;
    };
    /**
       * Create an edge between two nodes
       *
       * @param {T} source
       * @param {T} destination
       */
    Graph.prototype.addEdge = function (source, destination) {
        var sourceNode = this.addNode(source);
        var destinationNode = this.addNode(destination);
        sourceNode.addAdjacent(destinationNode);
        destinationNode.addAdjacent(sourceNode);
    };
    /**
       * Remove an edge between two nodes
       *
       * @param {T} source
       * @param {T} destination
       */
    Graph.prototype.removeEdge = function (source, destination) {
        var sourceNode = this.nodes.get(source);
        var destinationNode = this.nodes.get(destination);
        if (sourceNode != null && destinationNode != null) {
            sourceNode.removeAdjacent(destination);
        }
    };
    /**
       * Depth-first search
       *
       * @param {T} data
       * @param {Map<T, boolean>} visited
       * @returns
       */
    Graph.prototype.depthFirstSearchAux = function (node, visited, result) {
        var _this = this;
        if (node == null)
            return;
        visited.set(node.data, true);
        result.push(node.data);
        node.adjacent.forEach(function (item) {
            if (!visited.has(item.data)) {
                _this.depthFirstSearchAux(item, visited, result);
            }
        });
    };
    Graph.prototype.depthFirstSearch = function (start) {
        var visited = new Map();
        var startNode = this.nodes.get(start);
        if (startNode == null) {
            return null;
        }
        var result = [];
        this.depthFirstSearchAux(startNode, visited, result);
        console.log(result);
        return result;
    };
    /**
       * Breadth-first search
       *
       * @param {T} data
       * @returns
       */
    Graph.prototype.breadthFirstSearchAux = function (node, visited) {
        var queue = new queue_1.Queue();
        if (node == null)
            return;
        queue.enqueue(node);
        visited.set(node.data, true);
        while (!queue.list.isEmpty()) {
            node = queue.dequeue();
            if (node == null)
                continue;
            console.log(node.data);
            node.adjacent.forEach(function (item) {
                if (!visited.has(item.data)) {
                    visited.set(item.data, true);
                    queue.enqueue(item);
                }
            });
        }
    };
    Graph.prototype.breadthFirstSearch = function () {
        var _this = this;
        var visited = new Map();
        this.nodes.forEach(function (node) {
            if (!visited.has(node.data)) {
                _this.breadthFirstSearchAux(node, visited);
            }
        });
    };
    return Graph;
}());
exports.Graph = Graph;
function comparator(a, b) {
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}
var graph = new Graph(comparator);
graph.addNode(1);
graph.addNode(2);
graph.addNode(3);
graph.addNode(4);
graph.addNode(5);
graph.addNode(6);
graph.addNode(7);
graph.addNode(8);
graph.addNode(9);
graph.addNode(10);
graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(3, 5);
graph.addEdge(5, 8);
graph.addEdge(4, 6);
graph.depthFirstSearch(5);
graph.depthFirstSearch(7);
// graph.breadthFirstSearch()
