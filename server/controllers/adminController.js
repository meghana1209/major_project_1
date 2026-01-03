const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getStats = async (req, res) => {
  try {
    const totalRevenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = totalRevenueAgg[0] ? totalRevenueAgg[0].total : 0;

    const categorySales = await Order.aggregate([
      { $unwind: '$items' },
      { $lookup: { from: 'products', localField: 'items.product', foreignField: '_id', as: 'product' } },
      { $unwind: '$product' },
      { $group: { _id: '$product.category', sales: { $sum: { $multiply: ['$items.qty', '$items.price'] } } } }
    ]);

    const bestSelling = await Order.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.product', qty: { $sum: '$items.qty' } } },
      { $sort: { qty: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
      { $unwind: '$product' },
      { $project: { _id: 1, qty: 1, name: '$product.name' } }
    ]);

    res.json({ totalRevenue, categorySales, bestSelling });
  } catch (err) {
    console.error('Admin stats error', err);
    res.status(500).json({ message: 'Server error' });
  }
};