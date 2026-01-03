const express = require('express');
const router = express.Router();

// Admin routes placeholder
router.get('/stats', (req, res) => {
  res.status(501).json({ message: 'Admin stats not implemented yet' });
});

module.exports = router;
