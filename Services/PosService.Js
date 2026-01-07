const Transaction = require('../models/TrackerSchema');
const crypto = require('crypto');

function generateReference(posId) {
  return `TX-${posId}-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
}

async function createTransaction({
  amount,
  paymentMethod,
  description,
  user,
  pos,
  source
}) {
  if (!amount || amount <= 0) {
    throw new Error('Invalid transaction amount');
  }

  const reference = generateReference(pos.id);

  const transaction = await Transaction.create({
    reference,
    merchantId: pos.merchantId,
    posId: pos.id,
    userId: user.id,
    eventType: 'SALE',
    paymentMethod,
    amount,
    description,
    source
  });

  return transaction;
}

module.exports = {
  createTransaction
};
