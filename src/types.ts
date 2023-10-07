export interface Notes {
  idNota: number
  titulo: string
  descripcion: string
  fecha: string
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
