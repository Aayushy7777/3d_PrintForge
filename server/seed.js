const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const fs = require('fs');
const path = require('path');

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/printforge';

async function seed() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to', MONGODB_URI);

  const dataPath = path.join(__dirname, 'data', 'products.json');
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const products = JSON.parse(raw);

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Seeded products:', products.length);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
