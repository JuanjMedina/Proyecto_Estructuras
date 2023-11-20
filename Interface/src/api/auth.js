import axios from "axios"
const API = 'http://localhost:3000'
export const loginRequest = async ({token}) => {
  return await axios.get(`${API}/login/`, {
   headers:{ 
    Authorization: `Bearer ${token}`
   }
  })
  
}

export const notesRequest = async ({token})=> {
  return await axios.get(`${API}/notes/`, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}