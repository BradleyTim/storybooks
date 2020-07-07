const express = require('express');
const passport = require('passport');
const router = express.Router();

// GET /auth/google authenticate with google
router.get('/google', passport.authenticate('google', { scope: ['profile']}));

// GET /auth/google/callback Google authenticate
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/'}),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// GET /auth/logout Logout user
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;