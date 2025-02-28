import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Radio, Typography, message } from "antd";  // 引入Ant Design的组件
import { register } from "../api/API.js";  // 假设你有一个注册的API方法
import "../styles/register.css";
const { Title } = Typography;  // 这是 Ant Design 的 Title 组件，用于显示标题

const Register = () => {
  const [loading, setLoading] = useState(false);  // 控制按钮加载状态
  const navigate = useNavigate();  // 获取导航函数

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      // 调用注册接口
      const roleValue = values.role === "student" ? 0 : 1;

      // 调用注册接口
      const response = await register({ ...values, role: roleValue });
      const result = await response.json();

      if (response.ok && result.code === 200) {
        message.success("注册成功！");
        navigate("/login");  // 注册成功后跳转到登录页面
      } else {
        message.error(result.message || "注册失败！");
      }
    } catch (error) {
      message.error(error.message || "注册请求失败，请稍后重试！");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <Title level={2} style={{ textAlign: "center" }}>
          注册页面
        </Title>

        <Form
          name="register"
          onFinish={handleRegister}
          initialValues={{
            role: "student",  // 默认角色为学生
          }}
          layout="vertical"
          style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
        >
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
            hasFeedback
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: "请输入有效的邮箱", type: "email" }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item label="角色" name="role" rules={[{ required: true, message: "请选择角色" }]}>
            <Radio.Group>
              <Radio value="student">学生</Radio>
              <Radio value="counselor">心理咨询师</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="昵称" name="nickname">
            <Input placeholder="请输入昵称（可选）" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              注册
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <span>已经有账户？</span>
            <Button type="link" onClick={() => navigate("/login")}>
              去登录
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
