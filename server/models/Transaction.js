const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Bills', 'Entertainment', 'Shopping', 'Health', 'Other'],
    default: 'Other'
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
