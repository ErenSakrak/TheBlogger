import React, { useState } from "react";
import { Form, Input, Button, Space, message } from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/api/register",
        values
      );
      console.log(response.data);

      message.success("Kayıt başarıyla tamamlandı.");

      navigate("/login");
    } catch (error) {
      console.error("Kayıt hatası:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message);
      } else {
        message.error("Kayıt sırasında bir hata oluştu.");
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
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1), 5px 5px 5px 3px #F8EDFF",
          
        }}
      >
        <h2 style={{ textAlign: "center" }}>Kayıt Ol</h2>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Geçerli bir e-mail adresi giriniz.",
              },
              {
                required: true,
                message: "E-mail adresi boş bırakılamaz.",
              },
            ]}
          >
            <Input />
          </Form.Item>

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
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Kayıt Ol
              </Button>
            </Space>
          </Form.Item>

          {/* Uyarı mesajları */}
          <div style={{ textAlign: "center", color: "red" }}>
            {form.getFieldError("email") &&
              form.getFieldError("email").join(", ")}
          </div>
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

      {/* Additional box for social login buttons */}
      <div
        style={{
          width: "300px",
          padding: "20px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1), 0px 0px 5px 3px #F8EDFF",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column", // Dikey yönde sırala
            alignItems: "center", // Ortala
            gap: "10px", // İstediğiniz boşluk miktarını ayarlayabilirsiniz
          }}
        >
          <Button
            icon={<GoogleOutlined />}
            onClick={() => console.log("Google ile Giriş Yap")}
          >
            Google ile Kayıt Ol
          </Button>
          <Button
            icon={<FacebookOutlined />}
            onClick={() => console.log("Facebook ile Giriş Yap")}
          >
            Facebook ile Kayıt Ol
          </Button>
          <Button
            icon={<AppleOutlined />}
            onClick={() => console.log("Apple ile Giriş Yap")}
          >
            Apple ile Kayıt Ol
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
