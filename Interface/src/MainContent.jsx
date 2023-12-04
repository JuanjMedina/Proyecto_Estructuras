/* eslint-disable react/prop-types */
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import Box from './components/box'
import { useEffect, useState } from 'react'
import { notesData } from './api/auth.js'
import Box from './components/box2.jsx'
import './MainContent.css'
import Cookies from 'js-cookie'
import History from './History.jsx'
import Folder from './Folder.jsx'
import NoteFormPage from './components/noteForm.jsx'
import { useAuth } from './context/authContext.jsx'
import ChangeNotas from './changeNotas.jsx'

function MainContent({
  historialVisible,
  folderVisible,
  toggleHistorial,
  noteVisible,
  changeNotesFolder
}) {
  const [todos, setTodos] = useState([])
  const data = Cookies.get('token')
  const { dataInput } = useAuth()
  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await notesData({ token: data })
        setTodos(res.data)
        console.log(res.data)
      } catch (e) {
        console.log(e)
      }
    }

    if (data) getNotes()
  }, [])
  const results = todos
  // const results = [
  //   {
  //     id_nota: 1,
  //     tema_nota: 'matematicas',
  //     descripcion_nota: 'Texto Nota 1',
  //     fecha_nota: 'hoy1',
  //     id_carpeta: 1,
  //     id_usuario: '1MHZtPiA0vXtzkUaRZ8VoBPOTKn2'
  //   },
  //   {
  //     id_nota: 2,
  //     tema_nota: 'biologia',
  //     descripcion_nota: 'Texto Nota 2',
  //     fecha_nota: 'hoy2',
  //     id_carpeta: 1,
  //     id_usuario: '1MHZtPiA0vXtzkUaRZ8VoBPOTKn2'
  //   },
  //   {
  //     id_nota: 3,
  //     tema_nota: 'sociales',
  //     descripcion_nota: 'Texto Nota 3',
  //     fecha_nota: 'hoy3',
  //     id_carpeta: 1,
  //     id_usuario: '1MHZtPiA0vXtzkUaRZ8VoBPOTKn2'
  //   },
  //   {
  //     id_nota: 4,
  //     tema_nota: 'ingles',
  //     descripcion_nota: 'Texto Nota 4',
  //     fecha_nota: 'hoy4',
  //     id_carpeta: 2,
  //     id_usuario: '1MHZtPiA0vXtzkUaRZ8VoBPOTKn2'
  //   },
  //   {
  //     id_nota: 5,
  //     tema_nota: 'EDUCACION SEXUAL',
  //     descripcion_nota: 'Texto Nota 5',
  //     fecha_nota: 'hoy5',
  //     id_carpeta: 2,
  //     id_usuario: '1MHZtPiA0vXtzkUaRZ8VoBPOTKn2'
  //   },
  //   {
  //     id_nota: 6,
  //     tema_nota: 'programacion',
  //     descripcion_nota: 'Texto Nota 6',
  //     fecha_nota: 'hoy6',
  //     id_carpeta: 2,
  //     id_usuario: '1MHZtPiA0vXtzkUaRZ8VoBPOTKn2'
  //   }
  //   // Puedes agregar más objetos según sea necesario
  // ]

  const posters = [
    'https://i.pinimg.com/564x/61/f1/7b/61f17b7802cf99162ef915d831e0b024.jpg',
    'https://i.pinimg.com/236x/a6/b9/89/a6b989b2da2328fe36f6724b9d746c8c.jpg',
    'https://i.pinimg.com/236x/d1/62/79/d162792cfaf0337ccc02742a811c7cb4.jpg',
    'https://i.pinimg.com/236x/b6/72/f9/b672f9f5633d5664fe0833f886e1a834.jpg',
    'https://i.pinimg.com/236x/34/cb/dd/34cbdd85a5b89eab296184da01fdf41e.jpg',
    'https://i.pinimg.com/236x/19/d6/10/19d610b54e100f96509341c2aa610aaa.jpg'
  ]

  return (
    <main>
      <div className="container">
        {historialVisible && <History toggleHistorial={toggleHistorial} />}
        {folderVisible && <Folder />}
        {noteVisible && <NoteFormPage />}
        {changeNotesFolder && <ChangeNotas />}
        {dataInput.length > 0
          ? dataInput.map((note) => (
              <Box
                key={note.id_nota}
                id={note.id_nota}
                tema={note.tema_nota}
                name={`Nota ${note.id_nota}`}
                styleClass={`box-style-${Math.floor(Math.random() * 7) + 1}`}
                poster={posters[Math.floor(Math.random() * 6)]}
                text={note.descripcion_nota}
                date={note.fecha_nota}
              />
            ))
          : results.map((note) => (
              <Box
                key={note.id_nota}
                id={note.id_nota}
                tema={note.tema_nota}
                name={`Nota ${note.id_nota}`}
                styleClass={`box-style-${Math.floor(Math.random() * 7) + 1}`}
                poster={posters[Math.floor(Math.random() * 6)]}
                text={note.descripcion_nota}
                date={note.fecha_nota}
              />
            ))}
      </div>
    </main>
  )
}

export default MainContent
