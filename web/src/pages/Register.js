import React, { useState } from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import axios from 'axios';

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/api/register', values);
      console.log(response.data); // Başarı veya hata mesajını konsola yazdırabilirsiniz

      // Başarı durumunda kullanıcıya bildirim göster
      message.success('Kayıt başarıyla tamamlandı.');
    } catch (error) {
      console.error('Kayıt hatası:', error);

      // Hata durumunda kullanıcıya bildirim göster
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Kayıt sırasında bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '300px', margin: 'auto', marginTop: '50px' }}>
      <h2>Kayıt Ol</h2>
      <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'Geçerli bir e-mail adresi giriniz.',
            },
            {
              required: true,
              message: 'E-mail adresi boş bırakılamaz.',
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
              message: 'Kullanıcı adı boş bırakılamaz.',
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
              message: 'Şifre boş bırakılamaz.',
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
        <div style={{ textAlign: 'center', color: 'red' }}>
          {form.getFieldError('email') && form.getFieldError('email').join(', ')}
        </div>
        <div style={{ textAlign: 'center', color: 'red' }}>
          {form.getFieldError('username') && form.getFieldError('username').join(', ')}
        </div>
        <div style={{ textAlign: 'center', color: 'red' }}>
          {form.getFieldError('password') && form.getFieldError('password').join(', ')}
        </div>
      </Form>
    </div>
  );
};

export default Register;
