import { useState } from 'react'
import './App.css'
import { Input, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShare, faX } from '@fortawesome/free-solid-svg-icons'
import { createFolder } from './api/auth'
import Cookies from 'js-cookie'
export default function Folder() {
  const data = Cookies.get('token')
  const [inputText, setInputText] = useState('')
  const [closed, setClosed] = useState(false)

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const crearFolder = async ({ idUsuario, nombre }) => {
    try {
      await createFolder({ idUsuario, nombre })
    } catch (error) {
      console.error('Error al crear la carpeta:', error)
    }
  }

  const handleSubmit = () => {
    const idUsuario = data
    const nombre = inputText
    crearFolder({ idUsuario, nombre })
    setInputText('')
    closedFolder()
  }

  const closedFolder = () => {
    setClosed(true)
  }
  return (
    <section className={`section__folder ${closed ? 'closed' : ''}`}>
      <div className={'Folder'}>
        <FontAwesomeIcon
          icon={faX}
          className="close__folder"
          onClick={closedFolder}
        />
        <div className="section__folder__header">
          <h3>Nuevo Folder</h3>
          <FontAwesomeIcon icon={faUser} className="icon__history" size="xl" />
        </div>
        <div className="section__folder__input">
          <Input
            placeholder="Carpeta 1"
            value={inputText}
            onChange={handleInputChange}
            className="input__folder"
            maxLength={50}
            minLength={3}
          />
        </div>
        <div className="section_folder__submit">
          <FontAwesomeIcon icon={faShare} className="icon__share" size="lg" />
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={!inputText.trim()}
            className="button__folder"
          >
            Enviar
          </Button>
        </div>
      </div>
    </section>
  )
}
