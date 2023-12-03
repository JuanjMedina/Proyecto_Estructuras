import { useForm } from 'react-hook-form'
import { Form, Input, Select, Button } from 'antd'
import { Option } from 'antd/es/mentions'
import './noteForm.css'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { createNote, getAllFolders } from '../api/auth'

function NoteFormPage() {
  const { register, handleSubmit, reset, getValues } = useForm()
  const [folders, setFolders] = useState([])
  const data = Cookies.get('token')
  const [form] = Form.useForm()
  const [finish, setFinish] = useState(false)

  const onFinish = (values) => {
    console.log(values)
    const temaNota = values.nombreNota
    const fechaNota = values.fechaNota
    const descripcionNota = values.descripcion
    const idCarpeta = values.folder
    crearNota({ temaNota, fechaNota, descripcionNota, idCarpeta })
    setFinish(!finish)
    form.resetFields()
  }
  const crearNota = async ({
    temaNota,
    fechaNota,
    descripcionNota,
    idCarpeta
  }) => {
    await createNote({ temaNota, fechaNota, descripcionNota, idCarpeta })
  }

  const { TextArea } = Input

  useEffect(() => {
    const getNotes = async () => {
      try {
        const resFolders = await getAllFolders({ token: data })
        setFolders(resFolders.data)
      } catch (e) {
        console.log(e)
      }
    }
    if (data) getNotes()
  }, [])

  return (
    <div className="Major">
      <div className="minor">
        <Form onFinish={onFinish}>
          <Form.Item
            name="nombreNota"
            rules={[
              { required: true, message: 'Por favor, ingresa un nombre' }
            ]}
          >
            <Input className="nombre" placeholder="Nombre" />
          </Form.Item>

          <Form.Item name="descripcion">
            <TextArea rows={8} className="descripcion" />
          </Form.Item>

          <Form.Item
            name="folder"
            className="carpeta"
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

          <Form.Item label="fecha" name="fechaNota">
            <Input type="date" className="fecha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="boton">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default NoteFormPage
