import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js";  // 导入 Login 页面
import Home from "./pages/Home.js";    // 导入 Home 页面
import Register from "./pages/Register.js";  // 导入 Register 页面
const App = () => {
  return (
    <Router>   {/* 使用 BrowserRouter 包裹整个应用 */}
      <Routes>
        <Route path="/" element={<Login />} />    {/* 登录页面 */}

        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />  {/* 主页 */}
      </Routes>
    </Router>
  );
};

export default App;
