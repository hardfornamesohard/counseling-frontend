import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Session from './pages/Session';

const { Content } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Routes>
        <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Content style={{ padding: '24px', paddingBottom: '84px' }}>
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/session" element={<Session />} />
                    <Route path="/test" element={<div>心理测评页面</div>} />
                    <Route path="/admin" element={<div>管理中心页面</div>} />
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    
                  </Routes>
                </Content>
                <Footer />
              </>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
