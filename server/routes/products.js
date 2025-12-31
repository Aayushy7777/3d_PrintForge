const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - list all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    const base = `${req.protocol}://${req.get('host')}`;
    const mapped = products.map((p) => ({
      ...p,
      image: p.image && !p.image.startsWith('http') ? `${base}${p.image}` : p.image,
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id }).lean();
    if (!product) return res.status(404).json({ error: 'Not found' });
    const base = `${req.protocol}://${req.get('host')}`;
    const mapped = {
      ...product,
      image: product.image && !product.image.startsWith('http') ? `${base}${product.image}` : product.image,
    };
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products - create (admin)
router.post('/', async (req, res) => {
  try {
    const p = new Product(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
