const { asyncHandler } = require('../middlewares');
const { Coupon } = require('../models');
const { ErrorResponse } = require('../utils');

// @route   GET /api/v1/coupons
// @access  Admin
// @desc    Get all coupons.
const getCoupons = asyncHandler(async (req, res, next) => {
  const [result] = await Coupon.getCoupons();
  if (!result || !result[0]) {
    return next(new ErrorResponse(404, 'There is no coupon available!'));
  }

  return res.status(200).json({
    success: true,
    status: 200,
    data: result,
  });
});

module.exports = {
  getCoupons,
};
