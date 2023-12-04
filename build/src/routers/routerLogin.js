"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoginRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const createLoginRouter = ({ notesModel }) => {
    const loginController = new loginController_1.LoginController({ notesModel });
    const notesRouter = (0, express_1.Router)();
    notesRouter.post('/', loginController.getTokentoUser);
    return notesRouter;
};
exports.createLoginRouter = createLoginRouter;
