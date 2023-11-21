/* eslint-disable react/prop-types */

import { Input, Space } from 'antd'
const { Search } = Input

const onSearch = (value, _e, info) => console.log(info?.source, value)
export const SearchComponent = ({ collapsed }) => (
    collapsed ? null : (
      <Space direction="vertical">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          className='search'
        />
      </Space>
    )
  );
