import axios from 'axios'
const API = 'http://localhost:3000'

export const loginRequest = async ({Token}) => {
   const data = await axios.get(`${API}/login/`, {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
  return data
}
