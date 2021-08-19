const { asyncHandler } = require('../middlewares');
const { PaymentMethod } = require('../models');
const { ErrorResponse } = require('../utils');

// @route   GET /api/v1/paymentMethods
// @access  Admin
// @desc    Get all payment methods.
const getPaymentMethods = asyncHandler(async (req, res, next) => {
  const [paymentMethodData] = await PaymentMethod.getPaymentMethods();
  if (paymentMethodData.length === 0) {
    return next(new ErrorResponse(404, 'No payment methods were found'));
  }

  res.status(200).json({
    success: true,
    status: 200,
    data: paymentMethodData,
  });
});

module.exports = {
  getPaymentMethods,
};
