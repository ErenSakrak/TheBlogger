const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Token'ı al
  const token = req.header('Authorization');

  // Token yoksa
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Token doğrula
    const decoded = jwt.verify(token, 'your_secret_key'); // Secret key'i değiştirin

    // Kullanıcıyı talebe ekle
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('Authentication failed:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
