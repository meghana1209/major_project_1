const Wallet = require('../models/Wallet');

exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user._id });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
    res.json(wallet);
  } catch (err) {
    console.error('Get wallet error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Simple top-up for testing (credit)
exports.topUp = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
    const wallet = await Wallet.findOne({ user: req.user._id });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
    wallet.balance += Number(amount);
    wallet.transactions.push({ type: 'credit', amount: Number(amount) });
    await wallet.save();
    res.json(wallet);
  } catch (err) {
    console.error('TopUp error', err);
    res.status(500).json({ message: 'Server error' });
  }
};