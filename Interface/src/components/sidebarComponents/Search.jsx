/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Input, Space } from 'antd'
import { getNotebyString } from '../../api/auth'

const { Search } = Input

export const SearchComponent = ({ collapsed }) => {
  const [searchText, setSearchText] = useState('')

  const onSearch = async (value, _e, info) => {
    const stringBusqueda = value
    // Realiza la búsqueda
    const res = await getNotebyString({ stringBusqueda })
    console.log(res)

    // Limpia el campo de búsqueda después de la búsqueda
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
