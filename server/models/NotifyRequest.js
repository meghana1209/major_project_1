const mongoose = require('mongoose');

const NotifyRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  notified: { type: Boolean, default: false }
});

module.exports = mongoose.model('NotifyRequest', NotifyRequestSchema);
