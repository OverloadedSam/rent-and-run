const { ErrorResponse } = require('../utils');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // MySQL error of duplicate entry for unique valued columns/keys.
  if (error.errno && error.errno === 1062) {
    const message =
      'Provided phone or email already registered with another account!';
    error = new ErrorResponse(400, message);
  }

  // MySQL errors.
  if (error.errno && error.code) {
    const message = 'Internal server error';
    error = new ErrorResponse(500, message);
  }

  const status = error.statusCode || 500;
  const message = error.message || 'Unexpected error occurred.';

  return res.status(status).json({
    success: false,
    status,
    message,
  });
};

module.exports = errorHandler;
