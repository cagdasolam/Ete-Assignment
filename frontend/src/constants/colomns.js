import { Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Company Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Company Legal Number',
    dataIndex: 'legalNumber',
    key: 'legalNumber',
  },
  {
    title: 'Incorporation Country',
    dataIndex: 'incorporationCountry',
    key: 'incorporationCountry',
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, record) => (
      <Space size="middle">
        <Button ghost type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
        <Button danger icon={<DeleteOutlined />}
          onClick={() => handleRemove(record._id)}
        >Remove</Button>
      </Space>
    ),
  },
];
