import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth'
import { useAuth } from '../context/authContext.jsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export function Login() {
  const [Auth, setAuth] = useState(false)
  const [token, setToken] = useState('')
  const { updateToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(true)
        user.getIdToken().then((idToken) => {
          setToken(idToken)
          // updateToken(idToken)
        })
      } else {
        console.log('user not signed ')
      }
    })
  }, [Auth])

  const loginWithGoogle = () => {
    const auth = getAuth()
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((userCreation) => {
        if (userCreation) {
          setAuth(true)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (Auth === true) {
      navigate('/')
    }
  }, [Auth])

  return (
    <div className="app">
      <button onClick={loginWithGoogle}>Iniciar sesión con Google</button>
    </div>
  )
}
