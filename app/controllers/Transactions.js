const Transaction = require('../models/Transactions');

exports.create = (req, res) => {
  const transaction = new Transaction({
    cardOwner: req.body.cardOwner,
    cardNumber: req.body.cardNumber,
    cardValidityDate: req.body.cardValidityDate,
    cardVerificationCode: req.body.cardVerificationCode,
    description: req.body.description,
    price: req.body.price,
    selectedMethod: req.body.selectedMethod,
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