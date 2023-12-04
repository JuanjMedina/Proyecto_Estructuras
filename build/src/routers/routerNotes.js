"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotesRouter = void 0;
const express_1 = require("express");
const notesController_1 = require("../controllers/notesController");
const middellwares_1 = require("../middellwares");
const createNotesRouter = ({ notesModel }) => {
    const notesController = new notesController_1.NotesController({ notesModel });
    const notesRouter = (0, express_1.Router)();
    notesRouter.get('/', middellwares_1.middlewareUser.decodeToken, notesController.getAllNotes);
    notesRouter.post('/', notesController.createNote);
    notesRouter.get('/:id');
    notesRouter.delete('/:id');
    notesRouter.patch('/NotesandFolders', notesController.updateNote);
    return notesRouter;
};
exports.createNotesRouter = createNotesRouter;
