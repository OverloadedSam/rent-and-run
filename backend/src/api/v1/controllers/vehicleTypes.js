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

// @route   POST /api/v1/createVehicleType
// @access  Admin
// @desc    Create vehicle types for vehicles.
const createVehicleType = asyncHandler(async (req, res, next) => {
  const vehicleTypeData = { ...req.body };

  if (!vehicleTypeData.name) {
    return next(new ErrorResponse(400, 'Vehicle type name is not found!'));
  }

  const vehicleType = new VehicleType(vehicleTypeData);
  const [result] = await vehicleType.addVehicleType();

  res.status(201).json({
    success: true,
    status: 201,
    data: { ...vehicleTypeData, id: result.insertId },
  });
});

// @route   PUT /api/v1/updateVehicleType
// @access  Admin
// @desc    Update vehicle types.
const updateVehicleType = asyncHandler(async (req, res, next) => {
  const vehicleTypeData = { ...req.body };

  if (!vehicleTypeData.id || !vehicleTypeData.name) {
    const message = 'Vehicle type id or name is not found!';
    return next(new ErrorResponse(400, message));
  }

  const vehicleType = new VehicleType(vehicleTypeData);

  const [result] = await vehicleType.updateVehicleType();
  if (!result.changedRows) {
    const message = 'Can not update vehicle type! vehicle type id not found.';
    return next(new ErrorResponse(404, message));
  }

  res.status(200).json({
    success: true,
    status: 200,
    message: 'Veicle type updated successfully!',
    data: vehicleTypeData,
  });
});

module.exports = {
  getVehicleTypes,
  createVehicleType,
  updateVehicleType,
};
