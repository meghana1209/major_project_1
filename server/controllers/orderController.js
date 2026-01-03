const mongoose = require('mongoose');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Wallet = require('../models/Wallet');
const InventoryAlert = require('../models/InventoryAlert');
const { sendMail } = require('../utils/mailer');

exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { items } = req.body; // items: [{ product: id, qty }]
    if (!items || !items.length) return res.status(400).json({ message: 'No items' });

    // Load products and check stock
    const productIds = items.map(i => i.product);
    const products = await Product.find({ _id: { $in: productIds } }).session(session);
    const orderItems = [];
    let total = 0;

    for (const item of items) {
      const p = products.find(x => x._id.toString() === item.product);
      if (!p) throw new Error(`Product not found ${item.product}`);
      if (p.stock < item.qty) throw new Error(`Insufficient stock for ${p.name}`);
      orderItems.push({ product: p._id, name: p.name, image: p.image, price: p.price, qty: item.qty });
      total += p.price * item.qty;
    }

    // Wallet check and debit
    const wallet = await Wallet.findOne({ user: req.user._id }).session(session);
    if (!wallet) throw new Error('Wallet not found');
    if (wallet.balance < total) return res.status(400).json({ message: 'Insufficient wallet balance' });

    // Create order
    const order = new Order({ user: req.user._id, items: orderItems, totalPrice: total });
    await order.save({ session });

    // Debit wallet
    wallet.balance -= total;
    wallet.transactions.push({ type: 'debit', amount: total, order: order._id });
    await wallet.save({ session });

    // Decrement stock and create alerts if needed
    for (const item of items) {
      const p = products.find(x => x._id.toString() === item.product);
      p.stock -= item.qty;
      await p.save({ session });
      if (p.stock <= p.threshold) {
        const alert = new InventoryAlert({ product: p._id, productName: p.name, category: p.category, currentStock: p.stock, message: `Stock low after order for ${p.name}` });
        await alert.save({ session });
        // send email to admin
        try {
          const html = `<p>Low stock alert for <b>${p.name}</b> after a purchase.</p><p>Current stock: ${p.stock}</p><p>Order id: ${order._id}</p>`;
          await sendMail(process.env.EMAIL_USER || 'meghanab235@gmail.com', `Low stock: ${p.name}`, html);
        } catch (err) { console.error('Email send error', err); }
      }
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ order, walletBalance: wallet.balance });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('Create order error', err);
    res.status(400).json({ message: err.message || 'Order failed' });
  }
};

exports.listOrdersForUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json(orders);
  } catch (err) {
    console.error('List orders error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find().sort('-createdAt').populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    console.error('Admin list orders error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
