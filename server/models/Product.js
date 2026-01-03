const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, enum: ['Groceries', 'Electronics', 'Retail'] },
  stock: { type: Number, required: true, min: 0 },
  threshold: { type: Number, required: true, min: 0, default: 5 },
  image: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

ProductSchema.virtual('inStock').get(function () {
  return this.stock > 0;
});

module.exports = mongoose.model('Product', ProductSchema);
