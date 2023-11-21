import { useNavigate } from 'react-router-dom'
import { useAuthentication } from '../hooks/authentication'
import { useEffect} from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useAuth } from '../context/authContext'
import { loginRequest } from '../api/auth'

export function Login() {
  const { token, isAuth } = useAuth()
  
  const { Auth,updateAuth } = useAuthentication()
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await loginRequest({ token })
        if (res.status === 200) {
          console.log(res.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (isAuth && token) getUser()
  }, [token])

  useEffect(() => {
    if (Auth) {
      navigate('/')
    }
  }, [Auth, navigate])

  const loginWithGoogle = () => {
    const auth = getAuth()
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((userCreation) => {
        if (userCreation.user) {
          updateAuth(true)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="app">
      <button onClick={loginWithGoogle}>Iniciar sesión con Google</button>
    </div>
  )
}
