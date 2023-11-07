"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const routerTest_1 = require("./Test_Entrega/routerTest");
const routesUser_1 = require("./routers/routesUser");
const routerFolder_1 = require("./routers/routerFolder");
const routerNotes_1 = require("./routers/routerNotes");
const createApp = ({ notesModel }) => {
    var _a;
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, express_1.json)());
    const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
    app.use('/user', (0, routesUser_1.createUserRouter)({ notesModel }));
    app.use('/folders', (0, routerFolder_1.createFolderRouter)({ notesModel }));
    app.use('/notes', (0, routerNotes_1.createNotesRouter)({ notesModel }));
    app.use('/test', routerTest_1.createTestRouter);
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};
exports.createApp = createApp;
