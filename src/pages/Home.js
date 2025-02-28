import React from "react";

const Home = () => {
  const session = localStorage.getItem('Session') || '未获取到 session';
  const nickname = localStorage.getItem('nickname') || '未获取到 nickname';
  return (
    <div>
      <h2>主页</h2>
      <label>Hello World</label>
      <div>
        <label>Session: {session}</label>
        <label>Welcome: {nickname}</label>
      </div>
    </div>
  );
};

export default Home;
