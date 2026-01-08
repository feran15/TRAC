const mongoose = require('mongoose');

const PosAccountSchema = new mongoose.Schema({
  terminalId: { type: String, required: true },
  provider: { type: String },
  merchantName: { type: String },
  balance: { type: Number, default: 0 },
  status: { type: String, default: 'active' }
});

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posAccounts: [PosAccountSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
