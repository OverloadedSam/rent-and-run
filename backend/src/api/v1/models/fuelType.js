const { db } = require('../config');

class FuelType {
  constructor(fuelType) {
    this.fuelType = fuelType;
  }

  // Add a new fuel type for vehicles.
  async addFuelType() {
    const query = `
      INSERT INTO fuel_types
      VALUES (DEFAULT, ?);`;

    return db.execute(query, [this.fuelType.name]);
  }

  // Update name of fuel type.
  async updateFuelType() {
    const query = `
      UPDATE fuel_types
      SET name = ?
      WHERE id = ?;`;

    return db.execute(query, [this.fuelType.name, this.fuelType.id]);
  }

  // Get all fuel types.
  static async getFuelTypes() {
    const query = `SELECT * FROM fuel_types;`;

    return db.execute(query);
  }
}

module.exports = FuelType;
