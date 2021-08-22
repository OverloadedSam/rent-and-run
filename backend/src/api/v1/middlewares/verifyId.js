const { validate } = require('uuid');
const { ErrorResponse } = require('../utils');

// Verify uuids coming in request parameters.
const verifyId = (idToVerify) => (req, res, next) => {
  const id = req.params[idToVerify];

  if (!validate(id)) {
    return next(new ErrorResponse(400, `Id: "${id}" is not valid`));
  }

  next(); // Call the next middleware if id is valid.
};

module.exports = verifyId;
