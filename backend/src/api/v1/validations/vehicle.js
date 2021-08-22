const Joi = require('joi');

const constraints = {
  vehicle_type: Joi.number().label('Vehicle type'),
  fuel_type: Joi.number().label('Fuel type'),
  brand: Joi.string().min(1).max(64).trim().label('Brand'),
  model_name: Joi.string().min(1).max(64).trim().label('Model name'),
  images: Joi.array().items(Joi.string().required()),
  milage_in_km: Joi.number().min(1).max(100).label('Milage'),
  power_in_cc: Joi.number().label('Power in CC'),
  top_speed_in_kmph: Joi.number().min(1).max(440).label('Top speed'),
  available_count: Joi.number().max(100).label('Stock'),
  seats: Joi.number().label('Seats'),
  daily_rental_rate: Joi.number().min(1).label('Rental rate'),
  security_amount: Joi.number().label('Security amount'),
  description: Joi.string().max(512).label('Description'),
};

const schema = Joi.object().keys(constraints);

// Validate the vehicle data that is to be updated.
const validateVehicleUpdateData = (data) => schema.validate(data);

// Validate the vehicle data to create a vehicle.
const validateVehicleData = (data) => {
  const extendedSchema = schema.keys({
    vehicle_type: constraints.vehicle_type.required(),
    fuel_type: constraints.fuel_type.required(),
    brand: constraints.brand.required(),
    model_name: constraints.model_name.required(),
    milage_in_km: constraints.milage_in_km.required(),
    power_in_cc: constraints.power_in_cc.required(),
    top_speed_in_kmph: constraints.top_speed_in_kmph.required(),
    available_count: constraints.available_count.required(),
    daily_rental_rate: constraints.daily_rental_rate.required(),
    security_amount: constraints.security_amount.required(),
  });

  return extendedSchema.validate(data);
};

module.exports = {
  validateVehicleUpdateData,
  validateVehicleData,
};
