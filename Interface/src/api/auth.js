import axios from 'axios'
export const loginRequest = async (Token) => {
  return await axios.get('http://localhost:3000/login/', {
    headers: {
      Authorization: `Bearer ${Token}`
    }
  })
}
