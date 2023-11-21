/* eslint-disable react/prop-types */
import { UserOutlined } from '@ant-design/icons'

export const Logo = ({ collapsed }) => {
  return (
    <div className="logo">
      <div className="logo-icon">
      <UserOutlined />
      </div>
      {collapsed ?  null : (
        <div className="logo-text">
          <h2>UserJs</h2>
          <p>Be Happy</p>
        </div>
      )}
    </div>
  )
}
