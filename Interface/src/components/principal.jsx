import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import axios from 'axios'
import { notesRequest } from '../api/auth'
import Cookies from 'js-cookie'

export function MainPage() {
  const [todos, setTodos] = useState([])
  const data = Cookies.get('token')
  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await notesRequest({ token:data})
        setTodos(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    if(data)getNotes()
  }, [])

  return (
    <div>
      <h1>List of To do</h1>
      {todos.map((todo) => {
        return (
          <div
            key={todo.id_nota}
            style={{
              margin: '5px 0',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f5f5f5',
              color: '#000'
            }}
          >
            {todo.descripcion_nota}{' '}
          </div>
        )
      })}
    </div>
  )
}
