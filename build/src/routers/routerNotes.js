"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotesRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const notesController_1 = require("../controllers/notesController");
const createNotesRouter = ({ notesModel }) => {
    const notesController = new notesController_1.NotesController({ notesModel });
    const notesRouter = (0, express_1.Router)();
    notesRouter.get('/', notesController.getAllNotes);
    notesRouter.post('/', notesController.createNote);
    notesRouter.get('/:id');
    notesRouter.delete('/:id');
    return notesRouter;
};
exports.createNotesRouter = createNotesRouter;
