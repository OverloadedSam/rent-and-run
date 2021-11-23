const { v4: generateUuid } = require('uuid');
const { db } = require('../config');

class Rental {
  constructor(rental) {
    this.rental = rental;

    if (!this.rental.id) {
      this.rental.id = generateUuid();
    }
  }

  // Add rental to the DB.
  async createRental() {
    const query = `
      INSERT INTO rentals
      SET ?;`;

    return db.query(query, [this.rental]);
  }

  // Update rental by specifying rental id.
  async updateRental(rentalId) {
    const query = `UPDATE rentals SET ? WHERE id = ?`;

    this.rental.id = rentalId;
    return db.query(query, [this.rental, this.rental.id]);
  }

  // Apply/update coupon of a rental.
  async applyCoupon(couponId, userId) {
    const query = `
      UPDATE rentals
      SET coupon = ?
      WHERE id = ? AND user = ?;`;

    return db.execute(query, [couponId, this.rental.id, userId]);
  }

  // Delete a rental which is not paid by the user yet.
  static async deleteRental(rentalId, userId) {
    const query = `
      DELETE FROM rentals
      WHERE id = ? AND user = ? AND payment_status = 2;`;

    return db.execute(query, [rentalId, userId]);
  }

  // Get all rentals.
  static async getRentals() {
    const query = 'SELECT * FROM rentals;';

    return db.execute(query);
  }

  // Find rentals of a user.
  static async getRentalsByUser(userId) {
    const query = 'CALL get_rentals_by_user(?);';

    return db.execute(query, [userId]);
  }

  // Find a rental by rental id.
  static async getRentalById(rentalId) {
    const query = 'CALL get_rental_by_id_with_details(?);';

    return db.execute(query, [rentalId]);
  }
}

module.exports = Rental;
