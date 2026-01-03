const Product = require('../models/Product');
const InventoryAlert = require('../models/InventoryAlert');
const NotifyRequest = require('../models/NotifyRequest');
const { sendMail } = require('../utils/mailer');

exports.listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, q, priceMin, priceMax, ratingMin } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) filter.name = { $regex: q, $options: 'i' };
    if (priceMin || priceMax) filter.price = {};
    if (priceMin) filter.price.$gte = Number(priceMin);
    if (priceMax) filter.price.$lte = Number(priceMax);
    if (ratingMin) filter.rating = { $gte: Number(ratingMin) };

    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(filter).skip(skip).limit(Number(limit));
    const total = await Product.countDocuments(filter);

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('List products error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Get product error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, stock, threshold, image, rating } = req.body;
    const product = new Product({ name, price, category, stock, threshold, image, rating });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Create product error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Update product error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Delete product error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update stock - admin
eventsWhenStockChanged = async (product) => {
  try {
    if (product.stock <= product.threshold) {
      // create inventory alert
      const alert = new InventoryAlert({ product: product._id, productName: product.name, category: product.category, currentStock: product.stock, message: `Stock is low for ${product.name}` });
      await alert.save();

      // send email to admin
      const html = `<p>Low stock alert for <b>${product.name}</b> (Category: ${product.category})</p><p>Current stock: ${product.stock}</p><p>Time: ${new Date().toISOString()}</p>`;
      try { await sendMail(process.env.EMAIL_USER || 'meghanab235@gmail.com', `Low stock: ${product.name}`, html); } catch (err) { console.error('Email error', err); }
    }
  } catch (err) { console.error('stock change handler error', err); }
};

exports.updateStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const prevStock = product.stock;
    product.stock = Number(stock);
    await product.save();

    // If stock increased and >0, notify waiting customers
    if (prevStock <= 0 && product.stock > 0) {
      const requests = await NotifyRequest.find({ product: product._id, notified: false });
      for (const reqItem of requests) {
        try {
          const html = `<p>Good news! <b>${product.name}</b> is back in stock.</p><p>Check it here: ${process.env.CLIENT_URL || 'http://localhost:5173'}/product/${product._id}</p>`;
          await sendMail(reqItem.email, `Product back in stock: ${product.name}`, html);
          reqItem.notified = true;
          await reqItem.save();
        } catch (err) { console.error('Notify email error', err); }
      }
    }

    // Trigger low-stock handling
    await module.exports.eventsWhenStockChanged(product);

    res.json(product);
  } catch (err) {
    console.error('Update stock error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
