const Transaction = require('../models/Transactions');
const TransactionsRules = require('../rules/Transactions');

exports.create = (req, res) => {
  const transactionsRules = new TransactionsRules(req.body.selectedMethod);
  const transaction = new Transaction({
    cardOwner: req.body.cardOwner,
    cardNumber: transactionsRules.eraseCardNumbers(req.body.cardNumber),
    cardValidityDate: req.body.cardValidityDate,
    cardVerificationCode: req.body.cardVerificationCode,
    description: req.body.description,
    fee: transactionsRules.setValueWithFees(req.body.price),
    feeApplied: transactionsRules.getFeeApplied(),
    paymentDate: transactionsRules.setPaymentDate(),
    price: req.body.price,
    selectedMethod: req.body.selectedMethod,
    status: transactionsRules.setPayableStatus()
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

exports.findCredits = (req, res) => {
  const transactionsRules = new TransactionsRules();
  Transaction.find({
    'status': { $eq: 'waiting_funds' }
  }).then(transactions => {
    res.send(transactionsRules.sumValues(transactions));
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};
exports.findDebits = (req, res) => {
  const transactionsRules = new TransactionsRules();
  Transaction.find({
    'status': { $eq: 'paid' }
  }).then(transactions => {
    res.send(transactionsRules.sumValues(transactions));
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};