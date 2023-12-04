/* eslint-disable react/prop-types */
import { Menu } from 'antd'
import {
  UserOutlined,
  BookOutlined,
  FolderOutlined,
  SwapOutlined
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { notesandFoldersRequest } from '../../api/auth'
import Cookies from 'js-cookie'
import { useAuth } from '../../context/authContext'

const MenuList = ({ toggleChangeNotesFolder }) => {
  const { note } = useAuth()
  const [todos, setTodos] = useState([])
  const data = Cookies.get('token')

  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await notesandFoldersRequest({ token: data })
        setTodos(res.data)
      } catch (e) {
        console.log(e)
      }
    }

    if (data) getNotes()
  }, [note,data])

  return (
    <Menu mode="inline" className="Menu-bar" selectedKeys={[]}>
      <Menu.Item key="home" icon={<UserOutlined />}>
        My Profile
      </Menu.Item>
      <Menu.Item
        key="home2"
        icon={<SwapOutlined />}
        onClick={toggleChangeNotesFolder}
      >
        Cambiar nota
      </Menu.Item>

      {todos.map((item) => {
        return (
          <Menu.SubMenu
            key={item.id_carpeta}
            title={item.nombre_carpeta}
            icon={<FolderOutlined />}
          >
            {item.notas.map((notas) => {
              return (
                <Menu.Item key={notas.ID_Nota} icon={<BookOutlined />}>
                  {notas.tema_nota}
                </Menu.Item>
              )
            })}
          </Menu.SubMenu>
        )
      })}
    </Menu>
  )
}

export default MenuList
