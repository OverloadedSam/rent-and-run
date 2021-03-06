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

// @route   POST /api/v1/createRole
// @access  Admin
// @desc    Create roles for users.
const createRole = asyncHandler(async (req, res, next) => {
  const roleData = { ...req.body };

  if (!roleData.description) {
    return next(new ErrorResponse(400, 'Role description is not found!'));
  }

  const role = new Role(roleData);
  const [result] = await role.addRole();

  res.status(201).json({
    success: true,
    status: 201,
    data: { ...roleData, id: result.insertId },
  });
});

// @route   PUT /api/v1/updateRole
// @access  Admin
// @desc    Update roles that are already created.
const updateRole = asyncHandler(async (req, res, next) => {
  const roleData = { ...req.body };

  if (!roleData.id || !roleData.description) {
    return next(new ErrorResponse(400, 'Role id or description is not found!'));
  }

  const role = new Role(roleData);

  const [result] = await role.updateRole();
  if (!result.changedRows) {
    return next(
      new ErrorResponse(404, 'Can not update role! Role id not found.')
    );
  }

  res.status(200).json({
    success: true,
    status: 200,
    message: 'Role description updated successfully!',
    data: roleData,
  });
});

module.exports = {
  getRoles,
  createRole,
  updateRole,
};
