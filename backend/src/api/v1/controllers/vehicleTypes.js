const { asyncHandler } = require('../middlewares');
const { VehicleType } = require('../models');
const { ErrorResponse } = require('../utils');

// @route   GET /api/v1/vehicleTypes
// @access  Public
// @desc    Get all vehicle types.
const getVehicleTypes = asyncHandler(async (req, res, next) => {
  const [vehicleTypeData] = await VehicleType.getVehicleTypes();
  if (vehicleTypeData.length === 0) {
    return next(new ErrorResponse(404, 'No vehicle types were found'));
  }

  res.status(200).json({
    success: true,
    status: 200,
    data: vehicleTypeData,
  });
});

module.exports = {
  getVehicleTypes,
};
