const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getWallet, topUp } = require('../controllers/walletController');

router.get('/', protect, getWallet);
router.post('/topup', protect, topUp);

module.exports = router;