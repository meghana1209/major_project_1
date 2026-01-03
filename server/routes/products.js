const express = require('express');
const router = express.Router();
const { listProducts, getProduct } = require('../controllers/productController');

// GET /api/products - list products
router.get('/', listProducts);

// GET /api/products/:id - product details
router.get('/:id', getProduct);

module.exports = router;
