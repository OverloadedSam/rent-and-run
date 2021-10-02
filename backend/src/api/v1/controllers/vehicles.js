const { asyncHandler } = require('../middlewares');
const { Vehicle } = require('../models');
const { ErrorResponse, DateTime } = require('../utils');
const { validateVehicleData, validateVehicleUpdateData } =
  require('../validations').vehicle;

// @route   GET /api/v1/vehicles?bookingDate='date'&returningDate='date'
// @access  Public
// @desc    Get only essential details of vehicles.
const getVehicles = asyncHandler(async (req, res, next) => {
  const { bookingDate, returningDate } = req.query;
  let vehicleData = [];

  const error = DateTime.validateDateRange(bookingDate, returningDate);
  if (error || !bookingDate || !returningDate) {
    [vehicleData] = await Vehicle.getVehicles();
  } else {
    [[vehicleData]] = await Vehicle.getAvailableVehiclesOnDate(
      bookingDate,
      returningDate
    );
  }

  if (vehicleData.length === 0) {
    return next(new ErrorResponse(404, 'Sorry!, Vehicles not found.'));
  }

  return res.status(200).json({
    success: true,
    status: 200,
    data: vehicleData,
  });
});

// @route   GET /api/v1/vehicle/:vehicle_id?bookingDate='date'&returningDate='date'
// @access  Public
// @desc    Get full detail of a vehicle by specifying id.
const getVehicleWithDetails = asyncHandler(async (req, res, next) => {
  const vehicleId = req.params.vehicle_id;
  const { bookingDate, returningDate } = req.query;
  const [vehicleData] = await Vehicle.getVehicleDetails(vehicleId);

  if (vehicleData[0].length === 0) {
    const message = `Vehicle not found with given id "${vehicleId}"`;
    return next(new ErrorResponse(404, message));
  }

  const error = DateTime.validateDateRange(bookingDate, returningDate);
  if (!error) {
    const [[count]] = await Vehicle.getAvailableVehicleCountOnDate(
      vehicleId,
      bookingDate,
      returningDate
    );
    vehicleData[0][0].available_count = count.available_count;
  }

  return res.status(200).json({
    success: true,
    status: 200,
    data: vehicleData[0][0],
  });
});

// @route   POST /api/v1/createVehicle
// @access  Admin
// @desc    Create a new vehicle.
const createVehicle = asyncHandler(async (req, res) => {
  const vehicleData = { ...req.body };

  const { error } = validateVehicleData(vehicleData);

  if (error) {
    const [validationError] = error.details;

    return res.status(422).json({
      success: false,
      status: 422,
      message: validationError.message,
      key: validationError.context.key,
    });
  }

  const vehicle = new Vehicle(vehicleData);

  await vehicle.addVehicle();

  res.status(201).json({
    success: true,
    status: 201,
    message: 'Vehicle added successfully',
    data: { ...vehicle.vehicle },
  });
});

// @route   PUT /api/v1/vehicle/:vehicle_id
// @access  Admin
// @desc    Update vehicle data.
const updateVehicle = asyncHandler(async (req, res, next) => {
  const vehicleData = { ...req.body };
  const vehicleId = req.params.vehicle_id;

  const isDataEmpty = !Object.keys(vehicleData).length;
  const { error } = validateVehicleUpdateData(vehicleData);

  if (isDataEmpty) {
    return next(new ErrorResponse(422, 'Please provide data to be updated'));
  }
  if (error) {
    const [validationError] = error.details;

    return res.status(422).json({
      success: false,
      status: 422,
      message: validationError.message,
      key: validationError.context.key,
    });
  }

  const vehicle = new Vehicle(vehicleData);
  const [result] = await vehicle.updateVehicle(vehicleId);

  if (!result.affectedRows) {
    const message = 'Can not update coupon! Coupon id not found.';
    return next(new ErrorResponse(404, message));
  }

  res.status(200).json({
    success: true,
    status: 200,
    message: 'Vehicle data updated successfully',
    data: { ...vehicle.vehicle },
  });
});

module.exports = {
  getVehicles,
  getVehicleWithDetails,
  createVehicle,
  updateVehicle,
};
