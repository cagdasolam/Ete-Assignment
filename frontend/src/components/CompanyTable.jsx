import { Table, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTableFeatures } from '../utils/handleTable.jsx';

const CompanyTable = ({ companies, loading, pagination, actions, handleEdit, handleRemove }) => {
  const { handleTableChange, generateColumn } = useTableFeatures();

  const columns = [
    generateColumn('name', 'Company Name'),
    generateColumn('legalNumber', 'Company Legal Number'),
    generateColumn('incorporationCountry', 'Incorporation Country'),
    generateColumn('website', 'Website'),
  ];

  if (actions) {
    columns.push({
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button ghost type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleRemove(record._id)}>Remove</Button>
        </Space>
      ),
    });
  }

  return (
    <Table
      columns={columns}
      dataSource={companies}
      loading={loading}
      rowKey="_id"
      pagination={pagination}
      onChange={handleTableChange}
    />
  );

};

export { CompanyTable };