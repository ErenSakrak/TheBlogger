const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogController = require('./controllers/blogController');
const userController = require('./controllers/userController');
const path = require('path'); // path modülünü ekleyin

const app = express();
const port = 3001;

// CORS konfigürasyonu
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL'nizi güncelleyin
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://127.0.0.1:27017/Blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB bağlantı hatası kontrolü
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// BlogController'ı ve UserController'ı ekleyin
app.use('/api', blogController);
app.use('/api', userController);

// express.static middleware'ini ekleyin
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
