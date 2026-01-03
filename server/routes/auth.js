const express = require('express');
const router = express.Router();

// TODO: Implement controllers

// Signup placeholder
router.post('/signup', async (req, res) => {
  res.status(501).json({ message: 'Signup not implemented yet' });
});

// Login placeholder
router.post('/login', async (req, res) => {
  res.status(501).json({ message: 'Login not implemented yet' });
});

module.exports = router;
