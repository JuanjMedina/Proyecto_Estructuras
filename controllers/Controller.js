export class NotesController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getNotes (req, res) {
    res.json({ message: 'getNotes' })
  }

  postNotes (req, res) {
    res.send('postNotes')
  }

  getNoteById (req, res) {
    res.send('getNoteById')
  }

  putNoteById (req, res) {
    res.send('putNoteById')
  }

  deleteNoteById (req, res) {
    res.send('deleteNoteById')
  }
}
