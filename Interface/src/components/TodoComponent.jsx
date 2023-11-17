import { useEffect, useState } from 'react'
import axios from 'axios'
// eslint-disable-next-line react/prop-types
export function ListTodo({ Token }) {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    if (Token) {
      fetchData(Token)
    }
  }, [Token])

  const fetchData = async (Token) => {
    const res = await axios.get('http://localhost:3000/notes/', {
      headers: {
        Authorization: `Bearer ${Token}`
      }
    })
    setTodos(res.data)
  }

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
