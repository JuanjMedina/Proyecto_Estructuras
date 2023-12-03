import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRotateLeft,
  faUser,
  faX
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { historyData } from './api/auth'
import Cookies from 'js-cookie'
// const data = [
//   {
//     id_nota: 97,
//     tema_nota: 'matematicas',
//     fecha_cambios: '2023-11-19T02:26:56.000Z',
//     id_carpeta: 1,
//     id_usuario: '1MHZtPiA0vXtzkUaRZ8VoBPOTKn2'
//   },
//   {
//     id_nota: 13,
//     tema_nota: 'matematicas',
//     fecha_cambios: '2023-11-19T01:55:16.000Z',
//     id_carpeta: 1,
//     id_usuario: '1MHZtPiA0vXtzkUaRZ8VoBPOTKn2'
//   }
// ]

export default function History({toggleHistorial}) {
  const token = Cookies.get('token')
  const [closed, setClosed] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await historyData({ token })
        setData(res.data)
        setLoading(false)
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    }

    if (token) {
      getNotes()
    }
  }, [token])

  // const closedHistory = () => {
  //   // setClosed(true)
  //   toggleHistorial
  // }
  return (
    <section className="Section__History">
      <div className={`History ${closed ? 'closed' : ''}`}>
        <FontAwesomeIcon
          icon={faX}
          className="icon__close"
          size="sm"
          onClick={toggleHistorial}
        />
        <div className="History__header">
          <h2 className="History__header__title">Historial</h2>
          <FontAwesomeIcon icon={faUser} className="icon__history" size="xl" />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : data && data.length > 0 ? (
          data.map((item) => {
            const date = new Date(item.fecha_cambios)
            const formattedDate = `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`

            return (
              <div className="History__content" key={item.id_nota}>
                <div className="History__content__container">
                  <FontAwesomeIcon
                    icon={faArrowRotateLeft}
                    className="arrow__left"
                  />
                  <p>{formattedDate}</p>
                </div>
              </div>
            )
          })
        ) : (
          <p>No tienes historiales</p>
        )}
      </div>
    </section>
  )
}
