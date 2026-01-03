const express = require('express');
const router = express.Router();

// TODO: Implement controllers

const { signup, login } = require('../controllers/authController');

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

module.exports = router;
