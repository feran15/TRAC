// services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
// const sendMail = require('../utils/mailer');

class AuthService {
  static async hashPassword(password, saltRounds = 12) {
    return await bcrypt.hash(password, saltRounds);
  }

  static async comparePasswords(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static generateToken(user) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      // Provide a clear error so developers can fix missing env var quickly
      throw new Error('JWT_SECRET environment variable is required to generate JWT tokens. Add JWT_SECRET to your .env file. Example: JWT_SECRET=your_super_secret_value');
    }

    return jwt.sign(
      { 
        id: user._id,
        email: user.email 
      }, 
      secret,
      {
        expiresIn: '24h',
        issuer: 'mybank-api',
        audience: 'mybank-client'
      }
    );
  }

  static sanitizeUser(user) {
    const { password, __v, ...userWithoutSensitiveData } = user._doc || user;
    return userWithoutSensitiveData;
  }
}

module.exports = AuthService;