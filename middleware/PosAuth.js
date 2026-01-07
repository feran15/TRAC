const User = require('../models/UserSchema');

/**
 * POS authentication middleware
 * Expects POS API key in headers: x-api-key
 */
module.exports = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) return res.status(401).json({ error: 'POS API key missing' });

    // Find user that owns this POS
    const merchant = await User.findOne({ 'posAccounts.apiKey': apiKey });
    if (!merchant) return res.status(401).json({ error: 'Invalid POS API key' });

    // Find the specific POS account
    const pos = merchant.posAccounts.find(p => p.apiKey === apiKey);
    if (!pos) return res.status(401).json({ error: 'POS not registered for this merchant' });

    // Inject merchant and POS into request
    req.user = { id: merchant._id, role: 'MERCHANT' };
    req.pos = { id: pos._id, merchantId: merchant._id, name: pos.name };

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'POS authentication failed' });
  }
};
