const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const Product = require('./models/Product');
const Order = require('./models/Order');

const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.warn('MONGODB_URI not set in environment. Set it in .env or pass env var.');
}

mongoose.connect(MONGODB_URI || 'mongodb://127.0.0.1:27017/printforge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'PrintForge backend' });
});

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRouter);

// Serve frontend assets (images) so API can return absolute URLs
app.use('/assets', express.static(path.join(__dirname, '..', 'src', 'assets')));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
