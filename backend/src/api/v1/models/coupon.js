const { db } = require('../config');

class Coupon {
  constructor(coupon) {
    this.coupon = coupon;
  }

  // Add a new coupon for giving discount on rentals.
  async addCoupon() {
    const query = `INSERT INTO coupons SET ?;`;

    return db.query(query, this.coupon);
  }

  // Update coupon details by giving id.
  async updateCoupon(couponId) {
    const query = `
      UPDATE coupons
      SET ?
      WHERE id = ?;`;

    return db.query(query, [this.coupon, couponId]);
  }

  // Get all coupon.
  static async getCoupons() {
    const query = `SELECT * FROM coupons;`;

    return db.execute(query);
  }

  // Find coupon by code.
  static async getCouponByCode(code) {
    const query = `
      SELECT *
      FROM coupons
      WHERE coupon_code = ?`;

    return db.execute(query, [code]);
  }
}

module.exports = Coupon;
