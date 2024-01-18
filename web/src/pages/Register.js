// components/Register.js
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // useNavigate ekledik
import userService from "../services/userService";

const Register = () => {
  const navigate = useNavigate(); // useNavigate kullanımı

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await userService.register(values);
      message.success("Kayıt başarıyla tamamlandı. Giriş yapabilirsiniz.");
      navigate("/login"); // useNavigate ile yönlendirme
    } catch (error) {
      message.error("Kayıt sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Kullanıcı adı boş bırakılamaz!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Kullanıcı Adı"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Şifre boş bırakılamaz!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Şifre"
        />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Şifre tekrarı boş bırakılamaz!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Şifreler uyuşmuyor!"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Şifre Tekrarı"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Kayıt Ol
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
