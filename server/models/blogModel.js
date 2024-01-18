// blogModel.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  altTitle: String,
  description: String,
  image: String, // Sadece dosyanın adını saklayın
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
