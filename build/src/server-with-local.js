"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const NotesModel_1 = require("./models/local/NotesModel");
(0, app_1.createApp)({ notesModel: NotesModel_1.notesModel });
