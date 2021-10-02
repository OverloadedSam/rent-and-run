const { v4: generateUuid } = require('uuid');
const { db } = require('../config');

class Vehicle {
  constructor(vehicle) {
    this.vehicle = vehicle;

    if (!this.vehicle.id) this.vehicle.id = generateUuid();
  }

  // Add a new vehicle.
  async addVehicle() {
    const query = `INSERT INTO vehicles SET ?;`;

    if (this.vehicle.images) {
      this.vehicle.images = JSON.stringify(this.vehicle.images);
    }

    return db.query(query, [this.vehicle]);
  }

  // Update vehicle data by giving vehicle id.
  async updateVehicle(vehicleId) {
    const query = `
    UPDATE vehicles
    SET ?
    WHERE vehicles.id = ?;`;

    this.vehicle.id = vehicleId; // Overwrite vehicle.id generated in constructor.
    if (this.vehicle.images) {
      this.vehicle.images = JSON.stringify(this.vehicle.images);
    }

    return db.query(query, [this.vehicle, this.vehicle.id]);
  }

  // Get all vehicles.
  static async getVehicles() {
    const query = 'SELECT * FROM vw_vehicles_by_essential_details;';

    return db.execute(query);
  }

  // Get all available vehicles for given date range.
  static async getAvailableVehiclesOnDate(bookingDate, returningDate) {
    const query = 'CALL get_available_vehicles_on_date(?, ?);';

    return db.execute(query, [bookingDate, returningDate]);
  }

  // Get available count for a vehicle on given date range.
  static async getAvailableVehicleCountOnDate(
    vehicleId,
    bookingDate,
    returningDate
  ) {
    const query =
      'SELECT get_available_vehicle_count_on_date(?, ?, ?) AS available_count;';

    return db.query(query, [vehicleId, bookingDate, returningDate]);
  }

  // Get full details of a vehicle.
  static async getVehicleDetails(vehicleId) {
    const query = 'CALL get_vehicle_details(?);';

    return db.execute(query, [vehicleId]);
  }
}

module.exports = Vehicle;
