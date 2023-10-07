"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// import { notesModel } from './models/local/NotesModel'
const notesModel_1 = require("./models/mySql/notesModel");
(0, app_1.createApp)({ notesModel: notesModel_1.notesModel });
