import { readJson } from '../../utils/utils.js'
const notes = readJson('../data/notes.json')
export class movieNotes {
  static getAll () {
    return notes
  }
}
