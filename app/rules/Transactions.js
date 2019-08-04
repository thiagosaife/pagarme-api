'use strict';
const moment = require('moment');

class TransactionRules {
  constructor(payMethod) {
    this.feeApplied = 0;
    this.fees = {
      credit: 5,
      debit: 3,
    };
    this.moment = moment;
    this.methods = [
      'credit_card',
      'debit_card'
    ];
    this.payMethod = payMethod;
  }

  eraseCardNumbers(number) {
    const cardNumber = number.substr(number.length - 4);
    return cardNumber;
  }

  getFeeApplied() {
    return this.feeApplied;
  }

  setValueWithFees(currency) {
    const value = currency
      .replace(/[^\d\,]+/g, '')
      .replace(',', '.');
    if (this.payMethod === this.methods[0]) {
      const credit = value - (value / 100) * this.fees.credit;
      this.feeApplied = this.fees.credit;
      return credit;
    }
    const debit = value - (value / 100) * this.fees.debit;
    this.feeApplied = this.fees.debit;
    return debit;
  }

  setPayableStatus() {
    return this.payMethod === this.methods[0] ? 'waiting_funds' : 'paid';
  }

  setPaymentDate() {
    if (this.payMethod === this.methods[0]) {
      const plusMonth = moment(new Date()).add(30,'days').format('DD/MM/YYYY');
      return plusMonth;
    }
    const date = moment(new Date()).format('DD/MM/YYYY');
    return date;
  }

  sumValues(transactions) {
    if (!transactions.length) {
      return { fee: 0 };
    }
    const sum = transactions.reduce((a, b) => ({ fee: a.fee + b.fee }));
    return sum;
  }
}

module.exports = TransactionRules;