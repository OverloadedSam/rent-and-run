const { asyncHandler } = require('../middlewares');
const { Coupon } = require('../models');
const { ErrorResponse } = require('../utils');
const { validateCouponData, validateCouponUpdateData } =
  require('../validations').coupon;

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

// @route   POST /api/v1/createCoupon
// @access  Admin
// @desc    Create coupons to give discount on rentals.
const createCoupon = asyncHandler(async (req, res) => {
  const couponData = { ...req.body };

  const { error } = validateCouponData(couponData);

  if (error) {
    const [validationError] = error.details;

    return res.status(422).json({
      success: false,
      status: 422,
      message: validationError.message,
      key: validationError.context.key,
    });
  }

  const coupon = new Coupon(couponData);
  const [result] = await coupon.addCoupon();

  return res.status(201).json({
    success: true,
    status: 201,
    data: { ...couponData, id: result.insertId },
  });
});

// @route   PUT /api/v1/updateCoupons
// @access  Admin
// @desc    Update coupon data.
const updateCoupon = asyncHandler(async (req, res, next) => {
  const couponData = { ...req.body };
  const couponId = req.params.coupon_id;

  const isDataEmpty = !Object.keys(couponData).length;
  const { error } = validateCouponUpdateData(couponData);

  if (isDataEmpty) {
    return res.status(422).json({
      success: false,
      status: 422,
      message: 'Please provide data to be updated',
    });
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

  const coupon = new Coupon(couponData);
  const [result] = await coupon.updateCoupon(couponId);

  if (!result.changedRows) {
    return next(
      new ErrorResponse(404, 'Can not update coupon! Coupon id not found.')
    );
  }

  return res.status(200).json({
    success: true,
    status: 200,
    message: 'Coupon updated successfully',
    data: couponData,
  });
});

module.exports = {
  getCoupons,
  createCoupon,
  updateCoupon,
};
