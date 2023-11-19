
import { useAuth } from '../context/authContext'

export function MainPage() {
  const { token } = useAuth()
  return (
    <>
      <h1>Pagina oficial</h1>
      <p>{`${token}`}</p>
    </>
  )
}
