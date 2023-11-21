import '../App.css'
import { useEffect, useState } from 'react'
import { notesRequest } from '../api/auth'
import Cookies from 'js-cookie'
import Sidebar from './sidebarComponents/Sidebar'

export function MainPage() {
  const [todos, setTodos] = useState([])
  const data = Cookies.get('token')

  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await notesRequest({ token: data })
        setTodos(res.data)
      } catch (e) {
        console.log(e)
      }
    }

    if (data) getNotes()
  }, [])

  return (
    <div className="PrincipalPage">
      <section className='Aside'>
        <Sidebar /> 
      </section>
      <section className='main-content'>
        <h1>Hola TO do</h1>
      </section>
    </div>

  )
}
