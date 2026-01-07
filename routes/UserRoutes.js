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


/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User authentication and profile
 */

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, password]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/register', validateRegistration, UserController.register);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login user and return token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', loginLimiter, validateLogin, UserController.login);

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current user (requires auth)
 *     responses:
 *       200:
 *         description: Current user data
 */
router.get('/me', UserController.getCurrentUser);


module.exports = router;
