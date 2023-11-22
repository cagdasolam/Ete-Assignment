import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, message, Typography, Row, Col } from 'antd';
import { PlusOutlined, } from '@ant-design/icons';

import axios from 'axios';
import { CompanyTable } from '../components/CompanyTable';

const { Title } = Typography;

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/company', {
        headers: {
          'x-auth-token': token,
        },

      });

      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (company) => {
    console.log('Edit company:', company);
    setSelectedCompany(company);
    setModalVisible(true);
    form.setFieldsValue(company);
  };

  const handleRemove = async (companyId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/company/${companyId}`,
        {
          headers: {
            'x-auth-token': token,
          },
        });
      message.success('Company removed successfully');
      fetchData();
    } catch (error) {
      console.error('Error removing company:', error);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedCompany(null);
    form.resetFields();
  };

  const handleAddCompany = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (selectedCompany) {
        await axios.put(`/api/company/${selectedCompany._id}`, values, {
          headers: {
            'x-auth-token': token,
          },
        });
        message.success('Company updated successfully');
      } else {
        console.log('Add new company:', values);
        await axios.post('/api/company', values, {
          headers: {
            'x-auth-token': token,
          },
        });
        message.success('Company added successfully');
      }

      fetchData();
      handleModalClose();
    } catch (error) {
      console.error('Error adding new company:', error.message);
    }
  };

  return (
    <div>
      <Row align={'middle'} justify={'space-between'}>
        <Col>
          <Title level={2}>Companies</Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} style={{ marginRight: '16px' }} onClick={() => setModalVisible(true)}>
            Add New Company
          </Button>
        </Col>
      </Row>
      <CompanyTable companies={companies} loading={loading} actions={true} handleEdit={handleEdit} handleRemove={handleRemove} pagination={true} />

      <Modal
        title={selectedCompany ? 'Edit Company' : 'Add New Company'}
        open={modalVisible}
        onCancel={handleModalClose}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddCompany}>
          <Form.Item name="name" label="Company Name" rules={[{ required: true, message: 'Please enter company name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="legalNumber" label="Company Legal Number" rules={[{ required: true, message: 'Please enter company legal number' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="incorporationCountry" label="Incorporation Country" rules={[{ required: true, message: 'Please enter incorporation country' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website" rules={[{ required: true, message: 'Please enter website' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompanyList;
