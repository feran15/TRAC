const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      index: true, // hard guard against duplicates
    },

    amount: {
      type: Number,
      required: true,
    },

    source: {
      type: String,
      enum: ['cash', 'pos', 'expense'],
      required: true,
    },

    posId: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'synced'],
      default: 'pending',
      index: true,
    },

    timestamp: {
      type: Date,
      required: true,
      index: true, // important for sync & ordering
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

/**
 * Optional extra safety:
 * Prevent same POS from submitting same timestamp twice
 */
TransactionSchema.index(
  { posId: 1, timestamp: 1 },
  { unique: true, sparse: true }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
