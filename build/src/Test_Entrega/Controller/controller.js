"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doubleLinkedListFunction = exports.queueFunction = exports.stackFunction = void 0;
const queue_1 = require("../../../Structures/cola/queue");
const doubleLinkedLIst_1 = require("../../../Structures/doubleLinkedList/doubleLinkedLIst");
const stack_1 = require("../../../Structures/pila/stack");
const stackFunction = (_req, res) => {
    let historial = new stack_1.Stack();
    let cambioCosas;
    (function (cambioCosas) {
        cambioCosas[cambioCosas["add"] = 0] = "add";
        cambioCosas[cambioCosas["delete"] = 1] = "delete";
        cambioCosas[cambioCosas["create"] = 2] = "create";
        cambioCosas[cambioCosas["updated"] = 3] = "updated";
    })(cambioCosas || (cambioCosas = {}));
    let objects = 10000000;
    let start = Date.now();
    for (let index = 0; index < objects; index++) {
        // metemos la cantidad objects de cambios al historial
        const fecha = Date.now();
        const cambioRandom = Math.floor(Math.random() * 4);
        const changes = {
            date: fecha,
            cambios: cambioRandom
        };
        historial.push(changes);
    }
    // const buscarCambioTipo = (
    //   historial: Stack<cambio>,
    //   tipoBuscado: cambioCosas
    // ) => {
    //   const cambiosDelTipoBuscado = new DoubleLinkedList()
    //   const historialTemp = new Stack()
    //   while (historial.size() != 0) {
    //     const cambio = historial.pop()
    //     historialTemp.push(cambio)
    //     if (cambio.cambios === tipoBuscado) {
    //       cambiosDelTipoBuscado.addEnd(cambio)
    //     }
    //   }
    //   return cambiosDelTipoBuscado
    // }
    for (let index = 0; index < objects; index++) {
        // hacemos pop de todos los elementos en historial
        historial.pop();
    }
    let timeTaken = Date.now() - start;
    res.json({ message: 'Total time taken : ' + timeTaken + ' milliseconds' });
    console.log('Total time taken : ' + timeTaken + ' milliseconds');
};
exports.stackFunction = stackFunction;
const queueFunction = (_req, _res) => {
    console.log('HOla dadadads');
    queue_1.Queue;
};
exports.queueFunction = queueFunction;
const doubleLinkedListFunction = () => {
    doubleLinkedLIst_1.DoubleLinkedList;
};
exports.doubleLinkedListFunction = doubleLinkedListFunction;
