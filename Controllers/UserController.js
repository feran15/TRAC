const User = require('../models/UserSchema');
const authService = require('../Services/authService');
// const Pos = require ('../models/PosSchema')
const posvalidator = require('../utils/PosValidator')
class AuthController {

  static async getCurrentUser(req, res) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, user: authService.sanitizeUser(user) });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
  // ---------------------------
  // REGISTER
    // --------------------------- 

  static async register(req, res) {
  try {
    const { firstName, lastName, email, posId, password } = req.body;

    // Basic validation
    if (!email || !password || !posId) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and posId are required',
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Check existing POS ID
    const existingPosId = await User.findOne({ posId });
    if (existingPosId) {
      return res.status(409).json({
        success: false,
        message: 'POS ID already registered',
      });
    }

    if(!posId) {
      return res.status(404).json({
        success:false,
        message: 'POS ID is required',
      })
    }

      // Find Pos by posID
    //  const pos = await Pos.findOne({ posId })
    //  if(!pos) {
    //    return res.status(404).json({
    //      success:false,
    //      message: 'POS not found',
    //    })
    //  }

    const hashedPassword = await authService.hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      posId,
      isEmailVerified: false,
    });
    
    // Populate POS before returning response
    // const populatedUser = await User
    //   .findById(user._id)
    //   .populate('pos');

    const token = authService.generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user: authService.sanitizeUser(user),
    });
  } catch (error) {
    console.error('========== REGISTER FAILED ==========');
    console.error(error);
    console.error('Stack:', error.stack);
    console.error('=====================================');

    res.status(500).json({
      success: false,
      message: 'Registration failed',
    });
  }
}

  // ---------------------------
  // LOGIN 
  // ---------------------------
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = await authService.comparePasswords(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = authService.generateToken(user);

      res.json({
        success: true,
        token,
        user: authService.sanitizeUser(user),
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Login failed' });
    }
  }

}

module.exports = AuthController;
