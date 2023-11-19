/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useCallback } from 'react'
import { loginRequest } from '../api/auth'
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

  // const signup = async (Token) => {
  //   try {
  //     const res = await loginRequest({ Token })
  //     console.log('res', res)
  //     if (res.status === 200) {
  //       setUser(res.data)
  //       setIsAuth(true)
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  const signupUser= useCallback(async({token})=> {
    try {
      const res = await loginRequest({ token })
      console.log('res', res)
      if (res.status === 200) {
        setUser(res.data)
        setIsAuth(true)
      }
    } catch (e) {
      console.log(e)
    }
  })

  const updateToken = (token) => {
    setToken(token)
    
  }
  return (
    <AuthContext.Provider
      value={{
        signupUser,
        user,
        isAuth,
        updateToken,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
