import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.css';

// 导入图片
import centerIcon from '../assets/tabbar/center.png';
import forumIcon from '../assets/tabbar/forum.png';
import psyTestIcon from '../assets/navbar/PsyTest.png';
import sessionIcon from '../assets/tabbar/session.png';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: forumIcon, text: '首页', path: '/home' },
    { icon: sessionIcon, text: '咨询会话', path: '/session' },
    { icon: psyTestIcon, text: '心理测评', path: '/test' },
    { icon: centerIcon, text: '管理中心', path: '/admin' },
  ];

  return (
    <div className="footer">
      {menuItems.map((item) => (
        <div
          key={item.path}
          className={`footer-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <img src={item.icon} alt={item.text} className="footer-icon" />
          <span className="footer-text">{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Footer; 