import '../../App.css'
import { Button, Layout, theme } from 'antd'
import { Logo } from '../sidebarComponents/logo'
import MenuList from '../sidebarComponents/MenuList'
import { MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Header } from 'antd/es/layout/layout'
import { SearchComponent } from '../sidebarComponents/Search'
import FooterSidebar from './FooterSidebar'
const {  Sider } = Layout
function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorbackgroundContainer }
  } = theme.useToken()

  return (
    <Layout style={{ background: '#DBD4D0' }} className='Layout-sidebar'>
      <Sider collapsed={collapsed}  className="sidebar">
        <Logo collapsed={collapsed} />
        <SearchComponent collapsed={collapsed}/>
        <MenuList collapsed={collapsed} />
        <FooterSidebar collapsed={collapsed}  />
      </Sider>
      <Layout >
        <Header
          style={{ padding: 0, backgroundColor: colorbackgroundContainer }}
        >
          <Button
            type="text"
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuOutlined /> : <MenuUnfoldOutlined c/>}
          />
        </Header>
      </Layout>
    </Layout>
  )
}

export default Sidebar
