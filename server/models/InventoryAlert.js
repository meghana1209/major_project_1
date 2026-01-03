const mongoose = require('mongoose');

const InventoryAlertSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: { type: String },
  category: { type: String },
  currentStock: { type: Number },
  triggeredAt: { type: Date, default: Date.now },
  message: { type: String },
  resolved: { type: Boolean, default: false }
});

module.exports = mongoose.model('InventoryAlert', InventoryAlertSchema);
