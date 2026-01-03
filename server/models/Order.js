const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String },
  image: { type: String },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, min: 1 }
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [OrderItemSchema],
  totalPrice: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending','confirmed','shipped','delivered','cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
