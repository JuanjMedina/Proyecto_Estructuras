"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const createUserRouter = ({ notesModel }) => {
    const userController = new userController_1.UserController({ notesModel });
    const userRouter = (0, express_1.Router)();
    userRouter.get('/', userController.getAllUser);
    userRouter.post('/', userController.CreateUser);
    userRouter.get('/:id');
    userRouter.delete('/:id', userController.deleteUser);
    return userRouter;
};
exports.createUserRouter = createUserRouter;
