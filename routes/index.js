const express = require('express');
const router = express.Router();

// GET / login page
router.get('/', (req, res) => {
  res.render('login');
});

// GET /dashboard page
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

module.exports = router;
