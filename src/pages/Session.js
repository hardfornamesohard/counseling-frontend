import React, { useState } from 'react';
import ConsultantInfo from '../components/ConsultantInfo';
import ChatBox from '../components/ChatBox';
import '../styles/Session.css';

const Session = () => {
  const [showChat, setShowChat] = useState(false);

  const handleStartConsult = () => {
    setShowChat(true);
  };

  return (
    <div className="session-container">
      <ConsultantInfo onStartConsult={handleStartConsult} />
      <div className="chat-container">
        {showChat ? (
          <ChatBox />
        ) : (
          <div className="chat-placeholder">
            <div className="chat-welcome">
              <h3>欢迎来到心理咨询</h3>
              <p>这里是一个安全、私密的交流空间</p>
              <p>点击"立即咨询"开始与医生交谈</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Session; 