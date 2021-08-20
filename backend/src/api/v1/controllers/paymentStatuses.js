const { asyncHandler } = require('../middlewares');
const { PaymentStatus } = require('../models');
const { ErrorResponse } = require('../utils');

// @route   GET /api/v1/paymentStatuses
// @access  Admin
// @desc    Get all payment statuses.
const getPaymentStatuses = asyncHandler(async (req, res, next) => {
  const [paymentStatusData] = await PaymentStatus.getPaymentStatuses();
  if (paymentStatusData.length === 0) {
    return next(new ErrorResponse(404, 'No payment statuses were found'));
  }

  res.status(200).json({
    success: true,
    status: 200,
    data: paymentStatusData,
  });
});

// @route   POST /api/v1/createPaymentStatus
// @access  Admin
// @desc    Create payment status for payments.
const createPaymentStatus = asyncHandler(async (req, res, next) => {
  const paymentStatusData = { ...req.body };

  if (!paymentStatusData.name) {
    return next(new ErrorResponse(400, 'Payment status name is not found!'));
  }

  const paymentStatus = new PaymentStatus(paymentStatusData);
  const [result] = await paymentStatus.addPaymentStatus();

  res.status(201).json({
    success: true,
    status: 201,
    data: { ...paymentStatusData, id: result.insertId },
  });
});

// @route   PUT /api/v1/updatePaymentStatus
// @access  Admin
// @desc    Update payment status.
const updatePaymentStatus = asyncHandler(async (req, res, next) => {
  const paymentStatusData = { ...req.body };

  if (!paymentStatusData.id || !paymentStatusData.name) {
    const message = 'Payment status id or name is not found!';
    return next(new ErrorResponse(400, message));
  }

  const paymentStatus = new PaymentStatus(paymentStatusData);

  const [result] = await paymentStatus.updatePaymentStatus();
  if (!result.changedRows) {
    const message =
      'Can not update payment status! Payment status id not found.';
    return next(new ErrorResponse(404, message));
  }

  res.status(200).json({
    success: true,
    status: 200,
    message: 'Payment status updated successfully!',
    data: paymentStatusData,
  });
});

module.exports = {
  getPaymentStatuses,
  createPaymentStatus,
  updatePaymentStatus,
};
