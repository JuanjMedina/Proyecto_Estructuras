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
exports.FolderController = void 0;
const QueuePriority_1 = require("../../Structures/ColaPrioritaria/QueuePriority");
class FolderController {
    constructor({ notesModel }) {
        this.createFolder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allFolder = yield this.notesModel.createFolder({ data: req.body });
                res.status(200).json(allFolder);
            }
            catch (e) {
                res.status(400).json({ message: 'error' });
            }
        });
        this.getAllFolders = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allFolder = yield this.notesModel.getAllFolders();
                const queue = new QueuePriority_1.PriorityQueue(allFolder);
                const dataFolder = queue.items;
                res.status(200).json(dataFolder);
            }
            catch (e) {
                res.status(400).json({ message: 'error' });
            }
        });
        this.deleteFolder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.notesModel.deleteFolder({ id });
                res.status(200).json({ message: 'folder deleted' });
            }
            catch (e) {
                res.status(400).json({ message: 'error' });
            }
        });
        this.notesModel = notesModel;
    }
}
exports.FolderController = FolderController;
