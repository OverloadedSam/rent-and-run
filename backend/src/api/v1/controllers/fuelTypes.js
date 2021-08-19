const { asyncHandler } = require('../middlewares');
const { FuelType } = require('../models');
const { ErrorResponse } = require('../utils');

// @route   GET /api/v1/fuelTypes
// @access  Public
// @desc    Get all fuel types.
const getFuelTypes = asyncHandler(async (req, res, next) => {
  const [fuelTypeData] = await FuelType.getFuelTypes();
  if (fuelTypeData.length === 0) {
    return next(new ErrorResponse(404, 'No fuel types were found'));
  }

  res.status(200).json({
    success: true,
    status: 200,
    data: fuelTypeData,
  });
});

module.exports = {
  getFuelTypes,
};
