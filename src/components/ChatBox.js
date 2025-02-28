import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './ChatBox.css';

const ChatBox = () => {
  const [message, setMessage] = useState('');

  // 示例消息数据
  const messages = [
    { id: 1, type: 'received', content: '您好！我是张医生，很高兴为您服务。', time: '14:00' },
    { id: 2, type: 'sent', content: '医生您好，我最近感觉压力很大。', time: '14:01' },
    { id: 3, type: 'received', content: '我理解您的感受。能具体说说是什么让您感到压力吗？', time: '14:02' },
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log('发送消息:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-box">
      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.type}`}>
            <div className="message">
              <div className="message-content">{msg.content}</div>
              <div className="message-time">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <Input.TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="请输入消息..."
          autoSize={{ minRows: 1, maxRows: 4 }}
        />
        <Button 
          type="primary" 
          icon={<SendOutlined />} 
          onClick={handleSend}
          disabled={!message.trim()}
        >
          发送
        </Button>
      </div>
    </div>
  );
};

export default ChatBox; 