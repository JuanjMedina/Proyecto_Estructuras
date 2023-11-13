"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolderRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const folderController_1 = require("../controllers/folderController");
const createFolderRouter = ({ notesModel }) => {
    const folderController = new folderController_1.FolderController({ notesModel });
    const notesRouter = (0, express_1.Router)();
    notesRouter.get('/', folderController.getAllFolders);
    notesRouter.post('/', folderController.createFolder);
    notesRouter.delete('/:id', folderController.deleteFolder);
    return notesRouter;
};
exports.createFolderRouter = createFolderRouter;
