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
class NotesController {
    constructor({ notesModel }) {
        this.getAllNotes = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allNotes = yield this.notesModel.getAllNotes();
                res.status(200).json(allNotes);
            }
            catch (e) {
                res.status(400).json({ message: 'error' });
            }
        });
        this.createNote = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newNote = yield this.notesModel.createNote({ data: req.body });
                res.status(201).json(newNote);
            }
            catch (_a) {
                res.status(400).json({ message: 'error' });
            }
        });
        this.notesModel = notesModel;
    }
}
exports.NotesController = NotesController;
