const { db } = require('../config');

class PaymentStatus {
  constructor(paymentStatus) {
    this.paymentStatus = paymentStatus;
  }

  // Add a new payment status for payments.
  async addPaymentStatus() {
    const query = `
      INSERT INTO payment_statuses
      VALUES (DEFAULT, ?);`;

    return db.execute(query, [this.paymentStatus.name]);
  }

  // Update name of payment status.
  async updatePaymentStatus() {
    const query = `
      UPDATE payment_statuses
      SET name = ?
      WHERE id = ?;`;

    return db.execute(query, [this.paymentStatus.name, this.paymentStatus.id]);
  }

  // Get all payment statuses.
  static async getPaymentStatuses() {
    const query = `SELECT * FROM payment_statuses;`;

    return db.execute(query);
  }
}

module.exports = PaymentStatus;
