import React from 'react';
import { Card, Button, Space } from 'antd';
import './ConsultantInfo.css';

const ConsultantInfo = ({ onStartConsult }) => {
  const handleConsult = () => {
    // 调用父组件传入的回调函数
    onStartConsult();
  };

  const handleAppointment = () => {
    // 处理预约按钮点击
    console.log('预约咨询');
  };

  return (
    <Card className="consultant-card">
      <div className="consultant-info">
        <div className="consultant-basic">
          <img 
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" 
            alt="consultant" 
            className="consultant-avatar" 
          />
          <div className="consultant-details">
            <h3 className="consultant-name">张医生</h3>
            <p className="consultant-description">
              心理咨询师 | 10年经验 | 擅长：抑郁、焦虑、情感问题
            </p>
          </div>
        </div>
        <Space>
          <Button type="primary" onClick={handleConsult}>
            立即咨询
          </Button>
          <Button onClick={handleAppointment}>
            预约咨询
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default ConsultantInfo; 