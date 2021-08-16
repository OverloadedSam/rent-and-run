const { db } = require('../config');

class PaymentMethod {
  constructor(paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  // Add a new payment method for payments.
  async addPaymentMethod() {
    const query = `
      INSERT INTO payment_methods
      VALUES (DEFAULT, ?);`;

    return db.execute(query, [this.paymentMethod.name]);
  }

  // Update name of payment method.
  async updateFuelType() {
    const query = `
      UPDATE payment_methods
      SET name = ?
      WHERE id = ?;`;

    return db.execute(query, [this.paymentMethod.name, this.paymentMethod.id]);
  }

  // Get all payment methods.
  static async getFuelTypes() {
    const query = `SELECT * FROM payment_methods;`;

    return db.execute(query);
  }
}

module.exports = PaymentMethod;
