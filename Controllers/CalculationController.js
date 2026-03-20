const Transaction = require('../models/TransactionSchema');

exports.createTransaction = async (req, res) => {
  try {
    const { transactionId, amount, source, posId, status, timestamp } = req.body;

    if (amount === undefined || amount === null || Number.isNaN(Number(amount))) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required',
      });
    }

    const allowedSources = ['cash', 'pos', 'expense'];
    if (!allowedSources.includes(source)) {
      return res.status(400).json({
        success: false,
        message: 'Source must be one of: cash, pos, expense',
      });
    }

    const allowedStatuses = ['pending', 'confirmed', 'synced'];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be one of: pending, confirmed, synced',
      });
    }

    const createdTransaction = await Transaction.create({
      transactionId: transactionId || `TXN-${Date.now()}`,
      amount: Number(amount),
      source,
      posId: posId || null,
      status: status || 'pending',
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    });

    return res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      transaction: createdTransaction,
    });
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate transaction detected',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to create transaction',
    });
  }
};

exports.calculateTotals = async (req, res) => {
  try {
    /**
     * Only confirmed & synced transactions
     * Pending transactions are visible but NOT counted
     */
    const validStatuses = ['confirmed', 'synced'];

    const transactions = await Transaction.find({
      status: { $in: validStatuses },
    });

    let totals = {
      cash: 0,
      pos: 0,
      expenses: 0,
      netBalance: 0,
      transactionCount: transactions.length,
    };

    for (const tx of transactions) {
      switch (tx.source) {
        case 'cash':
          totals.cash += tx.amount;
          break;

        case 'pos':
          totals.pos += tx.amount;
          break;

        case 'expense':
          totals.expenses += tx.amount;
          break;

        default:
          break;
      }
    }

    totals.netBalance = totals.cash + totals.pos - totals.expenses;

    return res.status(200).json({
      success: true,
      totals,
    });
  } catch (error) {
    console.error('Calculation error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to calculate totals',
    });
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ timestamp: -1 });

    return res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction history',
    });
  }
};
