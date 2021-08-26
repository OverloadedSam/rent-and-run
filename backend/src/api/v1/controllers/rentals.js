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

module.exports = {
  getRentals,
  getUserRentals,
  getRentalById,
};
