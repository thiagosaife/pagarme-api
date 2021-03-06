module.exports = (app) => {
  const transactions = require('../controllers/Transactions');

  app.post('/transactions', transactions.create);
  app.get('/transactions', transactions.findAll);
  app.get('/credits', transactions.findCredits);
  app.get('/debits', transactions.findDebits);
}
