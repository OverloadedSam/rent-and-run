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

module.exports = {
  getVehicles,
};
