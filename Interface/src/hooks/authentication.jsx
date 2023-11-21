import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext.jsx'
import Cookies from 'js-cookie'

export function useAuthentication() {
  const [Auth, setAuth] = useState(false)
  const { updateToken } = useAuth()

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(true)
        user.getIdToken().then((idToken) => {
          updateToken(idToken)
          Cookies.set('token', idToken)
        })
      } else {
        console.log('Usuario no autenticado')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [Auth, updateToken])

  const updateAuth = (value) => {
    setAuth(value)
  }

  return {
    Auth,
    updateAuth
  }
}
