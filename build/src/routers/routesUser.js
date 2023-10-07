"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const createUserRouter = ({ notesModel }) => {
    const userController = new userController_1.UserController({ notesModel });
    const notesRouter = (0, express_1.Router)();
    notesRouter.get('/', userController.getAllUser);
    notesRouter.post('/', userController.CreateUser);
    notesRouter.get('/:id');
    notesRouter.delete('/:id', userController.deleteUser);
    return notesRouter;
};
exports.createUserRouter = createUserRouter;
