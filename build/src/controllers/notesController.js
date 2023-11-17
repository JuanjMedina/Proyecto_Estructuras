"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesController = void 0;
const Disjoinset_1 = require("../../Structures/ConjuntosDisjuntos/Disjoinset");
class NotesController {
    constructor({ notesModel }) {
        this.getAllNotes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.user;
                const { name, uid, email } = data;
                console.log(name, uid, email);
                yield this.notesModel.createUser({ data: req.user });
                const allNotes = yield this.notesModel.getAllNotes({ data: req.user });
                res.status(200).json(allNotes);
            }
            catch (e) {
                res.status(400).json({ message: 'error' });
            }
        });
        this.createNote = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newNote = yield this.notesModel.createNote({ data: req.body });
                res.status(201).json(newNote);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateNote = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { idNota, idCarpeta } = req.body;
                const FolderandNotes = yield this.notesModel.getAllNotesandFolders();
                const conjuntoDisjunto = new Disjoinset_1.ConjuntoDisjunto();
                for (const dataObject of FolderandNotes) {
                    conjuntoDisjunto.agregarNotaACarpeta(dataObject.id_nota, dataObject.id_carpeta);
                }
                console.log(conjuntoDisjunto);
                const result = yield this.notesModel.updateNoteandFolder({
                    //! falta logica
                    dataNoteandFolder: req.body
                });
                conjuntoDisjunto.cambiarCarpetaDeNota(idNota, idCarpeta);
                console.log(conjuntoDisjunto);
                res.status(200).json(result);
            }
            catch (e) {
                res.status(400).json({ message: 'error' });
            }
        });
        this.notesModel = notesModel;
    }
}
exports.NotesController = NotesController;
