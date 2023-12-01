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
