const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { requestNotify } = require('../controllers/notifyController');

// Customer requests notify
router.post('/', protect, requestNotify);

module.exports = router;