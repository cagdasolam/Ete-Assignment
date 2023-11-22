import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Select, message, Typography, Row, Col } from 'antd';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { ProductTable } from '../components/ProductTable';


const { Option } = Select;
const { Title } = Typography;


const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [form] = Form.useForm();

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/product', {
        headers: {
          'x-auth-token': token,
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
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
    }
  };

  useEffect(() => {
    fetchCompanies();
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
    form.setFieldsValue(product);
  };

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/product/${productId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      message.success('Product removed successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedProduct(null);
    form.resetFields();
  };

  const handleAddEditProduct = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (selectedProduct) {
        await axios.put(`/api/product/${selectedProduct._id}`, values, {
          headers: {
            'x-auth-token': token,
          },
        });
        message.success('Product updated successfully');
      } else {
        console.log('Add product:', values);
        await axios.post('/api/product', values, {
          headers: {
            'x-auth-token': token,
          },
        });
        message.success('Product added successfully');
      }

      fetchProducts();
      handleModalClose();
    } catch (error) {
      console.error('Error adding/editing product:', error.message);
    }
  };



  return (
    <div>
      <Row align={'middle'} justify={'space-between'}>
        <Col>
          <Title level={2}>Products</Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} style={{ marginRight: '16px' }} onClick={() => setModalVisible(true)}>
            Add New Company
          </Button>
        </Col>
      </Row>
      <ProductTable products={products} companies={companies} loading={loading} pagination={true} actions={true} handleEdit={handleEdit} handleRemove={handleRemove} />

      <Modal
        title={selectedProduct ? 'Edit Product' : 'Add New Product'}
        open={modalVisible}
        onCancel={handleModalClose}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddEditProduct}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Product Category"
            rules={[{ required: true, message: 'Please enter product category' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Product Amount"
            rules={[{ required: true, message: 'Please enter product amount' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amountUnit"
            label="Amount Unit"
            rules={[{ required: true, message: 'Please enter amount unit' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: 'Please select a company' }]}
          >
            <Select placeholder="Select a company">

              {companies.map((company) => (
                <Option key={company._id} value={company._id}>
                  {company.name}
                </Option>
              ))}

            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPage;
