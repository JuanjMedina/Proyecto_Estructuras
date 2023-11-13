"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConjuntoDisjunto = void 0;
class ConjuntoDisjunto {
    constructor() {
        this.conjunto = new Map();
    }
    agregarNotaACarpeta(notaId, carpetaId) {
        var _a;
        if (!this.conjunto.has(carpetaId)) {
            this.conjunto.set(carpetaId, new Set([notaId]));
        }
        else {
            (_a = this.conjunto.get(carpetaId)) === null || _a === void 0 ? void 0 : _a.add(notaId);
        }
    }
    cambiarCarpetaDeNota(notaId, nuevaCarpetaId) {
        var _a;
        let carpetaActualId = -1;
        for (const [carpetaId, notas] of this.conjunto) {
            if (notas.has(notaId)) {
                carpetaActualId = carpetaId;
                break;
            }
        }
        if (carpetaActualId !== -1) {
            // Mover la nota a la nueva carpeta
            (_a = this.conjunto.get(carpetaActualId)) === null || _a === void 0 ? void 0 : _a.delete(notaId);
            this.agregarNotaACarpeta(notaId, nuevaCarpetaId);
        }
    }
    obtenerConjuntoDeCarpeta(carpetaId) {
        return this.conjunto.get(carpetaId);
    }
    obtenerCarpetaDeNota(notaId) {
        for (const [carpetaId, notas] of this.conjunto) {
            if (notas.has(notaId)) {
                return carpetaId;
            }
        }
        return null;
    }
}
exports.ConjuntoDisjunto = ConjuntoDisjunto;
