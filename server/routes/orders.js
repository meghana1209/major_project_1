const express = require('express');
const router = express.Router();

// Orders placeholder
router.post('/', (req, res) => {
  res.status(501).json({ message: 'Create order not implemented yet' });
});

router.get('/', (req, res) => {
  res.status(501).json({ message: 'List orders not implemented yet' });
});

module.exports = router;
