import React, { useState } from "react";
import { Form, Input, Button, Space, message, Spin } from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom"; // useNavigate hook'unu import edin

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate(); // useNavigate hook'unu kullanın

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        values
      );
      setLoading(true);

      message.loading({
        content: "Giriş yapılıyor...",
        key: "loginLoading",
        duration: 0.4,
      });

      console.log(response.data);

      setTimeout(() => {
        message.success({ content: "Giriş başarıyla tamamlandı.", key: "loginSuccess" });
      }, 400);

      // login fonksiyonunu güncellendi, token'i parametre olarak gönder
      login(response.data.token);

      navigate("/");
    } catch (error) {
      console.error("Giriş hatası:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message);
      } else {
        message.error("Giriş sırasında bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: "400px",
          padding: "50px",
          boxShadow:
            "0px 0px 10px 0px rgba(0,0,0,0.1), 5px 5px 5px 3px #F8EDFF",
        }}
      >
        <Spin
          spinning={loading}
          style={{ display: "flex", justifyContent: "center" }}
        ></Spin>

        <h2 style={{ textAlign: "center" }}>Giriş Yap</h2>
        <Form form={form} name="login" onFinish={onFinish} scrollToFirstError>
          <Form.Item
            name="username"
            label="Kullanıcı Adı"
            rules={[
              {
                required: true,
                message: "Kullanıcı adı boş bırakılamaz.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Şifre"
            rules={[
              {
                required: true,
                message: "Şifre boş bırakılamaz.",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Giriş Yap
              </Button>
            </Space>
          </Form.Item>

          {/* Uyarı mesajları */}
          <div style={{ textAlign: "center", color: "red" }}>
            {form.getFieldError("username") &&
              form.getFieldError("username").join(", ")}
          </div>
          <div style={{ textAlign: "center", color: "red" }}>
            {form.getFieldError("password") &&
              form.getFieldError("password").join(", ")}
          </div>
        </Form>
      </div>

      <div
        style={{
          width: "300px",
          padding: "20px",
          boxShadow:
            "0px 0px 10px 0px rgba(0,0,0,0.1), 0px 0px 5px 3px #F8EDFF",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            icon={<GoogleOutlined />}
            onClick={() => console.log("Google ile Giriş Yap")}
          >
            Google ile Giriş Yap
          </Button>
          <Button
            icon={<FacebookOutlined />}
            onClick={() => console.log("Facebook ile Giriş Yap")}
          >
            Facebook ile Giriş Yap
          </Button>
          <Button
            icon={<AppleOutlined />}
            onClick={() => console.log("Apple ile Giriş Yap")}
          >
            Apple ile Giriş Yap
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
