/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useRef } from 'react'
import { getNotebyString } from '../api/auth'
export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error('useAuth debe estar dentro del proveedor AuthContext')
  return context
}
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [token, setToken] = useState('')
  const [dataInput, setDataInput] = useState([])
  const[note, setNote] = useState(false)

  const updateToken = (token) => {
    setToken(token)
    setIsAuth(true)
  }
  const removeToken = () => {
    setToken('')
    setIsAuth(false)
    
  }

  const getNotesByStringContext = async ({stringBusqueda}) => {
    const res = await getNotebyString({stringBusqueda})
    setDataInput(res.data)
    return(res.data)
  }

  const noteUpdated = () => {
    setNote(!note)
  }




 
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        updateToken,
        token,
        removeToken,
        getNotesByStringContext,
        dataInput,
        noteUpdated,
        note

      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
