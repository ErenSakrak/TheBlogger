// services/userService.js

const User = require('../models/userModel');

const userService = {
  register: async (userData) => {
    try {
      const { username, password } = userData;
      const newUser = new User({ username, password });
      await newUser.save();
      return { success: true, message: 'Kayıt başarıyla tamamlandı.' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Kayıt sırasında bir hata oluştu.' };
    }
  },

  login: async (userData) => {
    try {
      const { username, password } = userData;
      
      // Kullanıcı adına göre MongoDB'den kullanıcıyı bul
      const user = await User.findOne({ username });

      // Kullanıcı bulunamazsa hata döndür
      if (!user) {
        throw new Error('Kullanıcı adı veya şifre yanlış!');
      }

      // Şifre kontrolü
      if (user.password !== password) {
        throw new Error('Şifre yanlış.');
      }

      return { success: true, message: 'Giriş başarıyla tamamlandı.' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Giriş sırasında bir hata oluştu.' };
    }
  },
};

module.exports = userService;
