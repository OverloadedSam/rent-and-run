const asyncHandler = require('./asyncHandler');
const errorHandler = require('./errorHandler');
const protect = require('./protect');
const admin = require('./admin');

module.exports = {
  asyncHandler,
  errorHandler,
  protect,
  admin,
};
