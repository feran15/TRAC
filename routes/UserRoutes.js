const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const {
  authLimiter,
  loginLimiter,
  validateRegistration,
  validateLogin,
  authenticateToken, // this is your auth middleware
} = require('../middleware/authMiddleware');


// Auth / User routes
router.post('/register', validateRegistration, UserController.register);
router.post('/login', loginLimiter, validateLogin, UserController.login);
router.get('/me', UserController.getCurrentUser);


module.exports = router;
