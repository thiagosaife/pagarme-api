const mongoose = require('mongoose');

const TransactionsSchema = mongoose.Schema({
  cardOwner: String,
  cardNumber: String,
  cardValidityDate: String,
  cardVerificationCode: String,
  description: String,
  price: String,
  selectedMethod: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionsSchema);