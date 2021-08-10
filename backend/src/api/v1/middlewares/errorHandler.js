const { ErrorResponse } = require('../utils');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  if (error.errno === 1064 && error.code === 'ER_PARSE_ERROR') {
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
