/* eslint-disable react/prop-types */
import { Button, Layout } from 'antd'
import {
  FileAddOutlined,
  FolderAddOutlined,
  HistoryOutlined,
  LogoutOutlined,
  SwapOutlined
} from '@ant-design/icons'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAuthentication } from '../../hooks/authentication'
import { useAuth } from '../../context/authContext'

const { Footer } = Layout

const FooterSidebar = ({
  collapsed,
  toggleHistorial,
  toggleFolder,
  toggleNote
}) => {
  const { updateAuth } = useAuthentication()
  const { removeToken } = useAuth()

  const navigate = useNavigate()

  const handleSingOut = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        Cookies.remove('token')
        updateAuth(false)
        removeToken()
        navigate('/login')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Footer className="background-sidebar">
      <div
        className={collapsed ? 'footer-sidebar-collapsed' : 'footer-sidebar'}
      >
        <Button type="text" icon={<FileAddOutlined />} onClick={toggleNote} />
        <Button
          type="text"
          icon={<FolderAddOutlined />}
          onClick={toggleFolder}
        />
        <Button
          type="text"
          icon={<HistoryOutlined />}
          onClick={toggleHistorial}
        />
        <Button type="text" icon={<LogoutOutlined />} onClick={handleSingOut} />
      </div>
    </Footer>
  )
}

export default FooterSidebar
