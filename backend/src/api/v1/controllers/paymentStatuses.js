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

module.exports = {
  getPaymentStatuses,
};
