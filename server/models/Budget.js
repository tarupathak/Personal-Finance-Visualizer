const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  month: {
    type: String, 
    required: true
  },
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Bills', 'Entertainment', 'Shopping', 'Health', 'Other'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

BudgetSchema.index({ month: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('Budget', BudgetSchema);
