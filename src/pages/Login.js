import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/API.js";  // 导入 login 函数
import { Form, Input, Button, Typography, Space } from "antd";  // 从 Ant Design 中引入组件

const { Title } = Typography;



const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // 使用 useNavigate 获取 navigate 函数

  const [errorMessage, setErrorMessage] = useState(""); // 用来存放错误提示信息

  const handleLogin = async (values) => {
    const { username, password } = values;
    setLoading(true);
    
    try {
      const response = await login(username, password);
      const result = await response.json();

      if (response.ok && result.code === 200) {
        // 从响应头中获取session并存储
        const session = response.headers.get('Session');
        const nickname = response.headers.get('x-nickname');
        const role = response.headers.get('x-role');
        const uid = response.headers.get('x-uid');
    
        if (session) {
          localStorage.setItem('role', role);
          localStorage.setItem('Session', session);

          localStorage.setItem('nickname', nickname);
          localStorage.setItem('uid', uid);
        }
        navigate("/home");
      } else {
        setErrorMessage(result.message || "登录失败");
      }
    } catch (error) {
      setErrorMessage(error.message || "登录请求失败，请稍后重试！");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "登录页面";  // 设置浏览器标签页的标题
  }, []);  // 只在组件加载时设置一次
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <div style={{ width: "400px", backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Title level={2} style={{ textAlign: "center" }}>登录页面</Title>
        <Form onFinish={handleLogin}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          {errorMessage && (
            <div style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
              {errorMessage}  {/* 显示错误消息 */}
            </div>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button type="link" onClick={() => navigate("/register")} block>
            注册
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Login;
