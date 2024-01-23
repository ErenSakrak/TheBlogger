// server/userModel.js

const mongoose = require('mongoose');

// Kullanıcı modelini tanımla
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Kullanıcı modelini MongoDB'ye bağla
const User = mongoose.model('User', userSchema);

module.exports = User;
