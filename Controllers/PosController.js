const User = require("../models/UserSchema")

/**
 * POS Controller
 * Handles CRUD operations for POS accounts embedded in User
 */
class PosController {

  /**
   * Add a new POS account to a user
   * POST /users/:id/pos
   */
  static async addPosAccount(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const {
        provider,
        terminalId,
        name,
        apiKey,
        isActive = true
      } = req.body;

      if (!provider || !terminalId) {
        return res.status(400).json({
          error: 'provider and terminalId are required'
        });
      }

      user.posAccounts.push({
        provider,
        terminalId,
        name,
        apiKey, // encrypt here if needed
        isActive
      });

      await user.save();

      res.status(201).json({
        message: 'POS account added successfully',
        posAccounts: user.posAccounts
      });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  /**
   * Update an existing POS account
   * PUT /users/:id/pos/:posId
   */
  static async updatePosAccount(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const pos = user.posAccounts.id(req.params.posId);

      if (!pos) {
        return res.status(404).json({ error: 'POS account not found' });
      }

      const allowedUpdates = [
        'provider',
        'terminalId',
        'name',
        'apiKey',
        'isActive'
      ];

      allowedUpdates.forEach(field => {
        if (req.body[field] !== undefined) {
          pos[field] = req.body[field];
        }
      });

      await user.save();

      res.json({
        message: 'POS account updated successfully',
        pos
      });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  /**
   * Delete a POS account
   * DELETE /users/:id/pos/:posId
   */
  static async deletePosAccount(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const pos = user.posAccounts.id(req.params.posId);

      if (!pos) {
        return res.status(404).json({ error: 'POS account not found' });
      }

      pos.deleteOne();
      await user.save();

      res.json({
        message: 'POS account deleted successfully',
        posAccounts: user.posAccounts
      });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  /**
   * Get all POS accounts for a user
   * GET /users/:id/pos
   */
  static async getAllPosAccounts(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .select('posAccounts');

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user.posAccounts);

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  /**
   * Get a single POS account
   * GET /users/:id/pos/:posId
   */
  static async getSinglePosAccount(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .select('posAccounts');

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const pos = user.posAccounts.id(req.params.posId);

      if (!pos) {
        return res.status(404).json({ error: 'POS account not found' });
      }

      res.json(pos);

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = PosController;
