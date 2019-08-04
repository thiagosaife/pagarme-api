const Transaction = require('../models/Transactions');
const TransactionsRules = require('../rules/Transactions');

exports.create = (req, res) => {
  const transactionsRules = new TransactionsRules();
  const transaction = new Transaction({
    cardOwner: req.body.cardOwner,
    cardNumber: transactionsRules.eraseCardNumbers(req.body.cardNumber),
    cardValidityDate: req.body.cardValidityDate,
    cardVerificationCode: req.body.cardVerificationCode,
    description: req.body.description,
    paymentDate: transactionsRules.setPaymentDate(req.body.selectedMethod),
    price: req.body.price,
    selectedMethod: req.body.selectedMethod,
    status: transactionsRules.setPayableStatus(req.body.selectedMethod)
  });

  transaction.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.findAll = (req, res) => {
  Transaction.find()
    .then(transactions => {
      res.send(transactions);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};