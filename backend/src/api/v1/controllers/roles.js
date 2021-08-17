const { asyncHandler } = require('../middlewares');
const { Role } = require('../models');
const { ErrorResponse } = require('../utils');

// @route   GET /api/v1/roles
// @access  Admin
// @desc    Get all the roles.
const getRoles = asyncHandler(async (req, res, next) => {
  const [roleData] = await Role.getRoles();
  if (roleData.length === 0) {
    return next(new ErrorResponse(404, 'No roles were found'));
  }

  res.status(200).json({
    success: true,
    status: 200,
    data: roleData,
  });
});

module.exports = {
  getRoles,
};
