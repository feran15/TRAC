const Transaction = require('../models/TransactionSchema');

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
