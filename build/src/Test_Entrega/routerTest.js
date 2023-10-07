"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./Controller/controller");
exports.createTestRouter = (0, express_1.Router)();
exports.createTestRouter.get('/stack', controller_1.stackFunction);
exports.createTestRouter.get('/queue', controller_1.queueFunction);
exports.createTestRouter.get('/doubleLinkedList', controller_1.doubleLinkedListFunction);
