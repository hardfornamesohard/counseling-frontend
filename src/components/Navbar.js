import React from 'react';
import { Layout, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import {logout} from '../api/API.js';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const session = localStorage.getItem("Session");
    localStorage.removeItem("Session");
    localStorage.removeItem("nickname");
    logout(session);
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <Header className="navbar">
      <div className="navbar-left">
        <img 
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" 
          alt="Logo" 
          className="logo"
        />
      </div>
      <div className="navbar-right">
        <Space size="large">
          <UserOutlined 
            className="nav-icon" 
            onClick={handleProfile}
          />
          <LogoutOutlined 
            className="nav-icon" 
            onClick={handleLogout}
          />
        </Space>
      </div>
    </Header>
  );
};

export default Navbar; 