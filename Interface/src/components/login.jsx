import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
// import debounce from 'just-debounce-it'
// import { ListTodo } from './TodoComponent.jsx'
import { useAuth } from '../context/authContext.jsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const [Auth, setAuth] = useState(false)
  const [token, setToken] = useState('')
  const { signup, isAuth } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        setAuth(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {// 
      if (user) {
        setAuth(true)
        user.getIdToken().then((idToken) => {
          setToken(idToken)
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
    signup(token)
    if (Auth === true ) {
      navigate('/')
    }
  }, [Auth])

  return (
    <div className="app">
      {Auth ? (
        <div>
          {/* <ListTodo Token={token} /> */}
          <button onClick={handleSignOut}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={loginWithGoogle}>Iniciar sesión con Google</button>
      )}
    </div>
  )
}
