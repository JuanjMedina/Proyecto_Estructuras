/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useRef } from 'react'
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

  const updateToken = (token) => {
    setToken(token)
    setIsAuth(true)
  }
  const removeToken = () => {
    setToken('')
    setIsAuth(false)
    
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        updateToken,
        token,
        removeToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
