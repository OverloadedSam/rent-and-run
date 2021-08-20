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

// @route   POST /api/v1/createPaymentMethod
// @access  Admin
// @desc    Create payment methods for payments.
const createPaymentMethod = asyncHandler(async (req, res, next) => {
  const paymentMethodData = { ...req.body };

  if (!paymentMethodData.name) {
    return next(new ErrorResponse(400, 'Payment method name is not found!'));
  }

  const paymentMethod = new PaymentMethod(paymentMethodData);
  const [result] = await paymentMethod.addPaymentMethod();

  res.status(201).json({
    success: true,
    status: 201,
    data: { ...paymentMethodData, id: result.insertId },
  });
});

module.exports = {
  getPaymentMethods,
  createPaymentMethod,
};
