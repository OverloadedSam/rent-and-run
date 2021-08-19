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

// @route   POST /api/v1/createFuelType
// @access  Admin
// @desc    Create fuel types for vehicles.
const createFuelType = asyncHandler(async (req, res, next) => {
  const fuelTypeData = { ...req.body };

  if (!fuelTypeData.name) {
    return next(new ErrorResponse(400, 'Fuel type name is not found!'));
  }

  const fuelType = new FuelType(fuelTypeData);
  const [result] = await fuelType.addFuelType();

  res.status(201).json({
    success: true,
    status: 201,
    data: { ...fuelTypeData, id: result.insertId },
  });
});

module.exports = {
  getFuelTypes,
  createFuelType,
};
