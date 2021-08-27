const { asyncHandler } = require('../middlewares');
const { Rental, Coupon, Vehicle } = require('../models');
const { ErrorResponse, calculateNumberOfDays } = require('../utils');

// @route   GET /api/v1/rentals
// @access  Admin
// @desc    Get all the rentals.
const getRentals = asyncHandler(async (req, res, next) => {
  const [rentalData] = await Rental.getRentals();
  if (rentalData.length === 0) {
    return next(new ErrorResponse(404, 'No rentals were found'));
  }

  res.status(200).json({
    success: true,
    status: 200,
    data: rentalData,
  });
});

// @route   GET /api/v1/myRentals
// @access  Protected
// @desc    Get all rentals of logged in user.
const getUserRentals = asyncHandler(async (req, res, next) => {
  const [rentalData] = await Rental.getRentalsByUser(req.user.id);
  if (rentalData[0].length === 0) {
    const message = `No rentals found for the user ${req.user.id}`;
    return next(new ErrorResponse(404, message));
  }

  res.status(200).json({
    success: true,
    status: 200,
    data: rentalData[0],
  });
});

// @route   GET /api/v1/rental/:rental_id
// @access  Protected/Admin
// @desc    Get a rental with full details.
const getRentalById = asyncHandler(async (req, res, next) => {
  const rentalId = req.params.rental_id;
  const { role, id: userId } = req.user;

  const [rentalData] = await Rental.getRentalById(rentalId);
  if (rentalData[0].length === 0) {
    const message = `Rental not found for the id ${rentalId}`;
    return next(new ErrorResponse(404, message));
  }

  // Return if the rental doesn't belong to the user or the user is not an admin.
  if (!(rentalData[0][0].user === userId) && role !== 2) {
    const message = 'You do not have authority to see this information!';
    return next(new ErrorResponse(401, message));
  }

  res.status(200).json({
    success: true,
    status: 200,
    data: rentalData[0][0],
  });
});

// @route   POST /api/v1/createRental/:vehicle_id
// @access  Protected
// @desc    Create a rental in the DB.
const createRental = asyncHandler(async (req, res, next) => {
  const rentalData = { ...req.body };
  rentalData.vehicle = req.params.vehicle_id;
  rentalData.user = req.user.id;
  const {
    vehicle: vehicleId,
    booking_date: bookingDate,
    returning_date: returningDate,
  } = rentalData;

  // When date of booking is coming after the date of returning.
  if (new Date(bookingDate) > new Date(returningDate)) {
    return next(new ErrorResponse(422, 'Invalid returning date!'));
  }

  // When booking or returning date is of past time.
  if (
    new Date(bookingDate) <= new Date() ||
    new Date(returningDate) <= new Date()
  ) {
    return next(new ErrorResponse(422, 'Invalid date!'));
  }

  const [vehicleData] = await Vehicle.getVehicleDetails(vehicleId);

  // When no vehicle found with the given vehicle id.
  if (vehicleData[0].length === 0) {
    return next(new ErrorResponse(422, 'Invalid vehicle id'));
  }

  // If user has a coupon code validate it by finding it in DB.
  if (rentalData.coupon) {
    const [coupon] = await Coupon.getCouponByCode(rentalData.coupon);
    // Check for coupon expiry.
    if (coupon.length && coupon[0].valid_till < new Date()) {
      return next(new ErrorResponse(400, 'Coupon has expired!'));
    }
    rentalData.coupon = coupon.length ? coupon[0].id : null;
  }

  const daysCountForRental = calculateNumberOfDays(bookingDate, returningDate);
  rentalData.payment_status = 2; // Set payment status to "pending" by default.
  rentalData.rent_amount =
    Number(vehicleData[0][0].daily_rental_rate) * daysCountForRental +
    Number(vehicleData[0][0].security_amount);

  const rental = new Rental(rentalData);
  await rental.createRental();

  res.status(201).json({
    success: true,
    status: 201,
    message: 'Rental created successfully',
    data: { ...rental.rental },
  });
});

module.exports = {
  getRentals,
  getUserRentals,
  getRentalById,
  createRental,
};
