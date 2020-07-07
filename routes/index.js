const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middlewares/auth');

// GET / login page
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// GET /dashboard page
router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard');
});

module.exports = router;
