export interface Notes {
  idNota: string
  titulo: string
  descripcion: string
  fecha: string
  fechaEliminacion: string | null
  idFolder: number | null
}
export interface Folder {
  idCarpeta: number
  nombre: string
  created: Date
}

export type UUID = `${string}-${string}-${string}-${string}-${string}`

export interface NotesModel {
  getAllNotes: () => Promise<Notes[]>
}

export interface UserModel {
  name: string
  email: string
  telefono: number
}

export interface UserInterface {
  id_usuario: UUID
  nombre: string
  email: string
  telefono: number
}

export interface FolderModel {
  nombre: string
  idUsuario: UUID
}

export interface NoteModel {
  temaNota: string
  fechaNota: string
  descripcionNota: string
  idCarpeta: number
}
