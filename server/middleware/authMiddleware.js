const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  // Token'ı al
  const token = req.header('Authorization');

  // Token yoksa
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // "Bearer" kısmını ayır ve token'ı doğrula
    const decoded = jwt.verify(token.replace("Bearer ", ""), 'secretkey', { algorithm: 'HS256' });

    // Kullanıcıyı talebe ekle
    const user = await User.findById(decoded.user.id); // Kullanıcıyı id'ye göre bul
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
