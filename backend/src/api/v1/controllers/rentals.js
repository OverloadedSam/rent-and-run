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

module.exports = {
  getRentals,
};
