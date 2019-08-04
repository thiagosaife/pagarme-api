const mongoose = require('mongoose');

const TransactionsSchema = mongoose.Schema({
  cardOwner: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  cardValidityDate: {
    type: String,
    required: true,
  },
  cardVerificationCode: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  selectedMethod: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionsSchema);