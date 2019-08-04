const Transaction = require('../models/Transactions');

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