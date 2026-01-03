const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');
const { createOrder, listOrdersForUser } = require('../controllers/orderController');

// Create order - customer
router.post('/', protect, createOrder);

// List orders for current user
router.get('/', protect, listOrdersForUser);

module.exports = router;
