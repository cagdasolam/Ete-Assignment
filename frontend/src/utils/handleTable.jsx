import { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const useTableFeatures = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [searchText, setSearchText] = useState('');

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  };

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const generateColumn = (dataIndex, title, render = null) => ({
    title,
    dataIndex,
    key: dataIndex,
    sorter: (a, b) => a[dataIndex].localeCompare(b[dataIndex]),
    sortOrder: sortedInfo.columnKey === dataIndex && sortedInfo.order,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => record[dataIndex].toLowerCase().includes(value.toLowerCase()),
    render,
  });

  return { handleTableChange, generateColumn };
};
