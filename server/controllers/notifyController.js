const NotifyRequest = require('../models/NotifyRequest');
const Product = require('../models/Product');

exports.requestNotify = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const email = req.user ? req.user.email : req.body.email;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const existing = await NotifyRequest.findOne({ product: product._id, email, notified: false });
    if (existing) return res.status(200).json({ message: 'Already requested' });

    const reqDoc = new NotifyRequest({ user: req.user ? req.user._id : null, product: product._id, email });
    await reqDoc.save();
    res.status(201).json({ message: 'Notify request saved' });
  } catch (err) {
    console.error('Notify request error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listNotifyForAdmin = async (req, res) => {
  try {
    const agg = await NotifyRequest.aggregate([
      { $match: { notified: false } },
      { $group: { _id: '$product', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(agg);
  } catch (err) {
    console.error('List notify error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
