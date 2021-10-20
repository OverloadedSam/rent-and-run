const { v4: generateUuid } = require('uuid');
const { db } = require('../config');

class Payment {
  constructor(payment = {}) {
    this.payment = payment;
    if (!payment.id) this.payment.id = generateUuid();
  }

  // Create a new payment in DB.
  async createPayment(rental, transactionDetails) {
    const totalAmount =
      Number(rental.rent_amount) - Number(rental.discount_amount);
    const dt = new Date();
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

    const query = `INSERT INTO payments VALUES (? ,?, ?, ?, ?, ?, ?, ?);`;
    const preparedArray = [
      this.payment.id,
      rental.id,
      totalAmount,
      transactionDetails.statusCode,
      transactionDetails.razorpay_payment_id,
      dt.toISOString().slice(0, 16),
      this.payment.notes || null,
      JSON.stringify(transactionDetails),
    ];

    return db.execute(query, preparedArray);
  }
}

module.exports = Payment;
