const asyncHandler = require('./asyncHandler');
const errorHandler = require('./errorHandler');
const protect = require('./protect');
const admin = require('./admin');
const verifyId = require('./verifyId');
const validateOrigin = require('./validateOrigin');

module.exports = {
  asyncHandler,
  errorHandler,
  protect,
  admin,
  verifyId,
  validateOrigin,
};
