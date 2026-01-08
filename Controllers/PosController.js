const User = require('../models/UserSchema');
const validatePosId = require('../utils/PosValidator');

exports.addPosAccount = async (req, res) => {
  try {
    const { id } = req.params;        // user ID
    const { posId } = req.body;       // POS ID from frontend

    // 1. Validate POS ID
    const posData = validatePosId(posId);
    if (!posData) {
      return res.status(400).json({ message: 'Invalid POS ID' });
    }

    // 2. Find user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 3. Prevent duplicate POS on same user
    const alreadyExists = user.posAccounts.some(
      acc => acc.terminalId === posData.terminalId
    );

    if (alreadyExists) {
      return res.status(409).json({ message: 'POS already linked to this user' });
    }

    // 4. Attach POS account
    user.posAccounts.push({
      terminalId: posData.terminalId,
      provider: posData.provider,
      merchantName: posData.merchantName,
      status: posData.status,
      balance: 0
    });

    await user.save();

    return res.status(201).json({
      message: 'POS validated and linked successfully',
      pos: posData
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};