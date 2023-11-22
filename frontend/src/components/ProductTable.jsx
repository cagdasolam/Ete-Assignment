import { Table, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTableFeatures } from '../utils/handleTable.jsx';

const ProductTable = ({ products, loading, pagination, actions, handleEdit, handleRemove }) => {
  const { handleTableChange, generateColumn } = useTableFeatures();

  const columns = [
    generateColumn('name', 'Product Name'),
    generateColumn('category', 'Category'),
    generateColumn('amount', 'Amount'),
    generateColumn('amountUnit', 'Amount Unit'),
    generateColumn('company', 'Company Name', (text, record) => {
      if (!record.company) {
        return 'N/A';
      }
      return record.company.name;
    })
  ];

  if (actions) {
    columns.push(
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <Space size="middle">
            <Button ghost type='primary' icon={<EditOutlined />} onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button danger icon={<DeleteOutlined />} onClick={() => handleRemove(record._id)}>
              Remove
            </Button>
          </Space>
        ),
      },)
  };

  return (
    <Table
      columns={columns}
      dataSource={products}
      loading={loading}
      rowKey="_id"
      pagination={pagination}
      onChange={handleTableChange} />
  );
}

export { ProductTable };