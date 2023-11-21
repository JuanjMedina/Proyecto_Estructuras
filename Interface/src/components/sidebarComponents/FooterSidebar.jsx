/* eslint-disable react/prop-types */
import { Button, Layout } from 'antd'
import {
  FileAddOutlined,
  HistoryOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const { Footer } = Layout

const FooterSidebar = ({ collapsed }) => {
  const navigate = useNavigate()

  const handleSingOut = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        Cookies.remove('token')
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
        <Button type="text" icon={<FileAddOutlined />} />
        <Button type="text" icon={<HistoryOutlined />} />
        <Button type="text" icon={<LogoutOutlined />} onClick={handleSingOut} />
      </div>
    </Footer>
  )
}

export default FooterSidebar
