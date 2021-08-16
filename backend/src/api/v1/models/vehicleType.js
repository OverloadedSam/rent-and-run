const { db } = require('../config');

class VehicleType {
  constructor(vehicleType) {
    this.vehicleType = vehicleType;
  }

  // Add a new vehicle type for vehicles.
  async addVehicleType() {
    const query = `
      INSERT INTO vehicle_types
      VALUES (DEFAULT, ?);`;

    return db.execute(query, [this.vehicleType.name]);
  }

  // Update name of the vehicle type.
  async updateVehicleType() {
    const query = `
      UPDATE vehicle_types
      SET name = ?
      WHERE id = ?;`;

    return db.execute(query, [this.vehicleType.name, this.vehicleType.id]);
  }

  // Get all vehicle types.
  static async getVehicleTypes() {
    const query = `SELECT * FROM vehicle_types;`;

    return db.execute(query);
  }
}

module.exports = VehicleType;
