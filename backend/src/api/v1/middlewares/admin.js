const { ErrorResponse } = require('../utils');

const admin = async (req, res, next) => {
  const user = { ...req.user };

  if (user && user.role === 2) {
    next();
  } else {
    return next(
      new ErrorResponse(403, 'You do not have the authority for this resource')
    );
  }
};

module.exports = admin;
