'use strict';
const moment = require('moment');

class TransactionRules {
  constructor() {
    this.moment = moment;
    this.methods = [
      'credit_card',
      'debit_card'
    ]
  }

  eraseCardNumbers(number) {
    const cardNumber = number.substr(number.length - 4);
    return cardNumber;
  }

  setPayableStatus(payMethod) {
    return payMethod === this.methods[0] ? 'waiting_funds' : 'paid';
  }

  setPaymentDate(payMethod) {
    const date = moment(new Date()).format('DD/MM/YYYY');
    const plusMonth = moment(new Date()).add(30,'days').format('DD/MM/YYYY');
    return payMethod === this.methods[0] ? plusMonth : date;
  }
}

module.exports = TransactionRules;