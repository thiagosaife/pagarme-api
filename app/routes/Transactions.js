module.exports = (app) => {
  const transactions = require('../controllers/Transactions');

  app.get('/transactions', transactions.findAll);
}
