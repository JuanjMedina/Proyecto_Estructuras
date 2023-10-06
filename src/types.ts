export interface Notes {
  idNota: number
  titulo: string
  descripcion: string
  fecha: string
}

export interface NotesModel {
  getAllNotes: () => Promise<Notes[]>
}
