import { getAuth, signOut } from 'firebase/auth'
import { useAuth } from '../context/authContext'
const { signup, isAuth } = useAuth()

export function logout() {
  const handleSingOut = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        setAuth(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <button onClick={handleSingOut}>Cerrar sesión</button>
  )
}
