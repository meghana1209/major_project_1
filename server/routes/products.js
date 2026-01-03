const express = require('express');
const router = express.Router();

// GET /api/products - list products
router.get('/', async (req, res) => {
  res.status(501).json({ message: 'Products listing not implemented yet' });
});

// GET /api/products/:id - product details
router.get('/:id', async (req, res) => {
  res.status(501).json({ message: 'Product details not implemented yet' });
});

module.exports = router;
