const { asyncHandler } = require('../middlewares');
const { Rental } = require('../models');
const { ErrorResponse } = require('../utils');

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

module.exports = {
  getRentals,
  getUserRentals,
};
