const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['debit','credit'], required: true },
  amount: { type: Number, required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  createdAt: { type: Date, default: Date.now }
});

const WalletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: { type: Number, default: 0, min: 0 },
  transactions: [TransactionSchema]
});

module.exports = mongoose.model('Wallet', WalletSchema);
