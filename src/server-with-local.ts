import { createApp } from './app'
// import { notesModel } from './models/local/NotesModel'
import { notesModel } from './models/mySql/notesModel'

createApp({ notesModel })
