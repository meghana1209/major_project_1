const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');
const { createProduct, updateProduct, deleteProduct, updateStock } = require('../controllers/productController');
const { listOrdersForAdmin } = require('../controllers/orderController');
const { listNotifyForAdmin } = require('../controllers/notifyController');
const Product = require('../models/Product');

// Add product (admin)
router.post('/product', protect, restrictTo('admin'), createProduct);

// Edit product
router.put('/product/:id', protect, restrictTo('admin'), updateProduct);

// Delete product
router.delete('/product/:id', protect, restrictTo('admin'), deleteProduct);

// Update stock
router.put('/product/:id/stock', protect, restrictTo('admin'), updateStock);

// Orders
router.get('/orders', protect, restrictTo('admin'), listOrdersForAdmin);

// Notify requests aggregation
router.get('/notify', protect, restrictTo('admin'), listNotifyForAdmin);

// Admin stats
const { getStats } = require('../controllers/adminController');
router.get('/stats', protect, restrictTo('admin'), getStats);

module.exports = router;
