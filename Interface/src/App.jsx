import { useEffect, useState } from 'react'
import './App.css'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import { ListTodo } from './components/TodoComponent'

function App() {
  const [Auth, setAuth] = useState(false)
  const [token, setToken] = useState('')

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
       
        setAuth(false); 
      })
      .catch((error) => {
        console.error(error); 
      });
  }
  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(true)
        user.getIdToken().then((idToken) => {
          setToken(idToken)
          console.log(idToken)
        })
      } else {
        console.log('user not signed ')
      }
    })
  }, [])

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

  return (
    <div className="app">
      {Auth ? (
        <div>
          <ListTodo Token={token} />
          <button onClick={handleSignOut}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={loginWithGoogle}>Iniciar sesión con Google</button>
      )}
    </div>
  )
}

export default App
