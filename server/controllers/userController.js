const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Kullanıcı adının benzersiz olduğunu kontrol et
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu kullanıcı adı zaten kullanılmaktadır. Lütfen farklı bir kullanıcı adı seçin.' });
    }

    const newUser = new User({ email, username, password });

    await newUser.save();

    res.status(201).json({ message: 'Kayıt başarıyla tamamlandı.', user: newUser });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({ message: 'Kayıt sırasında bir hata oluştu.' });
  }
});


// Giriş işlemi için bir endpoint ekleyin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // E-posta ve şifre kontrolü burada gerçekleştirilecek

    // Örneğin, kullanıcıyı veritabanından bulma
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Giriş başarılıysa kullanıcı bilgilerini döndür
    res.status(200).json({ message: 'Giriş başarılı.', user });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ message: 'Giriş sırasında bir hata oluştu.' });
  }
});

module.exports = router;
