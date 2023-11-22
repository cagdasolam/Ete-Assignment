import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const LoginForm = ({ setLoggedIn }) => {
  const [errorMessage, setErrorMessage] = useState(null);


  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const res = await axios.post('/api/login', { email, password });
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token.split(' ')[1]);
        setLoggedIn(true);
        window.location.href = '/home';
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <Form
      name="login"
      onFinish={onFinish}
      style={{ maxWidth: '300px', margin: 'auto', marginTop: '50px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Log In
      </Title>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Log in
        </Button>
      </Form.Item>
      <Form.Item>
        <Link to="/register">
          <Button type="default" style={{ width: '100%' }}>
            Create Account
          </Button>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
