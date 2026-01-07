const mongoose = require('mongoose');

const TrackerSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true
    },
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    posId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    eventType: {
      type: String,
      enum: ['SALE', 'REFUND'],
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['CASH', 'POS', 'TRANSFER'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    description: String,
    source: {
      type: String,
      enum: ['ONLINE', 'OFFLINE'],
      default: 'ONLINE'
    },
    synced: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

/**
 * 🔥 CRITICAL FIX
 * Prevents Mongoose from reusing old cached models
 */
module.exports =
  mongoose.models.Tracker ||
  mongoose.model('Tracker', TrackerSchema);