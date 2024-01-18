const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogController = require('./controllers/blogController');
const path = require('path'); // path modülünü ekleyin

const app = express();
const port = 3001;


app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://127.0.0.1:27017/Blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB bağlantı hatası kontrolü
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// BlogController'ı ekle
app.use('/api', blogController);

// express.static middleware'ini ekleyin
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
