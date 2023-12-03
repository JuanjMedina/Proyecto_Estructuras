import axios from 'axios'
const API = 'http://localhost:3000'
export const loginRequest = async ({ token }) => {
  return await axios.get(`${API}/login/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const notesRequest = async ({ token }) => {
  return await axios.get(`${API}/notes/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const notesandFoldersRequest = async ({ token }) => {
  return await axios.get(`${API}/folders/NotesandFolders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const notesData = async ({ token }) => {
  return await axios.get(`${API}/notes/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const createFolder = async ({ nombre, idUsuario }) => {
  return await axios.post(
    `${API}/folders/`,
    { nombre },
    {
      headers: {
        Authorization: `Bearer ${idUsuario}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const historyData = async ({ token }) => {
  return await axios.get(`${API}/notes/notesHistory`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getAllFolders = async ({ token }) => {
  return await axios.get(`${API}/folders/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const changeNoteFolder = async ({ idNota, idCarpeta }) => {
  return await axios.patch(`${API}/notes/NotesandFolders`, {
    idNota,
    idCarpeta
  })
}

export const createNote = async ({
  temaNota,
  fechaNota,
  descripcionNota,
  idCarpeta
}) => {
  return await axios.post(
    `${API}/notes/`,
    { temaNota, fechaNota, descripcionNota, idCarpeta },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
