import { faUser, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Select } from 'antd'
import { Option } from 'antd/es/mentions'
import { useEffect, useState } from 'react'
// import { getAllFolders } from './api/auth'
import Cookies from 'js-cookie'
import { changeNoteFolder, getAllFolders, notesData } from './api/auth'
import { useAuth } from './context/authContext'

export default function ChangeNotas() {
  const { noteUpdated } = useAuth()
  const [form] = Form.useForm()
  const [todos, setTodos] = useState([])
  const [folders, setFolders] = useState([])
  const data = Cookies.get('token')
  const [finish, setFinish] = useState(false)
  const [closed, setClosed] = useState(false)

  const onFinish = (values) => {
    const idNota = values.note
    const idCarpeta = values.folder
    changeNote({ idNota, idCarpeta })
    setFinish(!finish)
    form.resetFields()
  }

  const changeNote = async ({ idNota, idCarpeta }) => {
    try {
      const res = await changeNoteFolder({ idCarpeta, idNota })
      noteUpdated()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const getNotes = async () => {
      try {
        const resNotes = await notesData({ token: data })
        setTodos(resNotes.data)
        const resFolders = await getAllFolders({ token: data })
        setFolders(resFolders.data)
      } catch (e) {
        console.log(e)
      }
    }

    if (data) getNotes()
  }, [data, finish])
  const closedChangeNtotes = ()=> {
    setClosed(true)
  }
  return (
    <section className={`changeNotesFolder${closed ? 'closed' : ''}`}>
      <div className="section__changeNotes">
        <FontAwesomeIcon
          icon={faX}
          className="icon__close"
          size="sm"
          onClick={closedChangeNtotes}
        />
        <div className="History__header">
          <h2 className="History__header__title">Cambiar carpeta</h2>
          <FontAwesomeIcon icon={faUser} className="icon__history" size="xl" />
        </div>
        <div>
          <Form form={form} onFinish={onFinish} className="section__formNotes">
            <Form.Item
              label="Selecciona la Carpeta"
              name="folder"
              rules={[
                { required: true, message: 'Por favor, selecciona una carpeta' }
              ]}
            >
              <Select placeholder="Selecciona la carpeta">
                {folders.map((folder) => (
                  <Option value={folder.id_carpeta} key={folder.id_carpeta}>
                    {folder.nombre_carpeta}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Selecciona la Nota"
              name="note"
              rules={[
                { required: true, message: 'Por favor, selecciona una nota' }
              ]}
            >
              <Select placeholder="Selecciona la nota">
                {todos.map((note) => (
                  <Option value={note.id_nota} key={note.id_nota}>
                    {note.tema_nota}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className="section__formNotes__submit">
              <Button
                type="primary"
                htmlType="submit"
                className="formNotes__submitButton"
              >
                Enviar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  )
}
