const { asyncHandler } = require('../middlewares');
const { Vehicle } = require('../models');
const { ErrorResponse } = require('../utils');

// @route   GET /api/v1/vehicles
// @access  Public
// @desc    Get only essential details of vehicles.
const getVehicles = asyncHandler(async (req, res, next) => {
  const [vehicleData] = await Vehicle.getVehicles();
  if (vehicleData.length === 0) {
    return next(new ErrorResponse(404, 'There are no vehicles in database'));
  }

  return res.status(200).json({
    success: true,
    status: 200,
    data: vehicleData,
  });
});

// @route   GET /api/v1/vehicle/:vehicle_id
// @access  Public
// @desc    Get full detail of a vehicle by specifying id.
const getVehicleWithDetails = asyncHandler(async (req, res, next) => {
  const vehicleId = req.params.vehicle_id;
  const [vehicleData] = await Vehicle.getVehicleDetails(vehicleId);

  if (vehicleData[0].length === 0) {
    const message = `Vehicle not found with given id "${vehicleId}"`;
    return next(new ErrorResponse(404, message));
  }

  return res.status(200).json({
    success: true,
    status: 200,
    data: vehicleData[0][0],
  });
});

module.exports = {
  getVehicles,
  getVehicleWithDetails,
};
