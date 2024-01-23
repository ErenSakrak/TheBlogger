import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });

      console.log(response.data); // Başarı veya hata mesajını konsola yazdırabilirsiniz
    } catch (error) {
      console.error('Giriş hatası:', error);
    }
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      <label>Kullanıcı Adı:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Şifre:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Giriş Yap</button>
    </div>
  );
};

export default Login;
