/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Input, Space } from 'antd'
import { useAuth } from '../../context/authContext'

const { Search } = Input

export const SearchComponent = ({ collapsed }) => {
  const [searchText, setSearchText] = useState('')
  const { getNotesByStringContext } = useAuth()

  const onSearch = async (value, _e, info) => {
    const stringBusqueda = value
    // Realiza la búsqueda
    const res = await getNotesByStringContext({ stringBusqueda })
    console.log(res)
    setSearchText('')
  }

  return collapsed ? null : (
    <Space direction="vertical">
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search"
      />
    </Space>
  )
}
