import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'antd';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginPage';
import RegisterForm from './pages/RegisterPage';
import CompaniesPage from './pages/CompaniesPage';
import ProductPage from './pages/ProductPage';

const { Content } = Layout;


const App = () => {
  const token = localStorage.getItem('token');
  const [isLoggedIn, setLoggedIn] = useState(token ? true : false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  return (
    <BrowserRouter>
      <Layout>
        <Navbar currentPath={currentPath} setCurrentPath={setCurrentPath} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        <Content>
          <Routes>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <LoginForm setLoggedIn={setLoggedIn} />} />
            <Route path="/register" element={isLoggedIn ? <Navigate to="/home" /> : <RegisterForm setLoggedIn={setLoggedIn} />} />
            <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/companies" element={isLoggedIn ? <CompaniesPage /> : <Navigate to="/login" />} />
            <Route path="/products" element={isLoggedIn ? <ProductPage /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
