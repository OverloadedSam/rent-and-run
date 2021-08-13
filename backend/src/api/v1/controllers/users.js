const { asyncHandler } = require('../middlewares');
const { User } = require('../models');

// @route   GET /api/v1/me
// @access  Protected
// @desc    Get the user by specifying id.
const getMyAccount = asyncHandler(async (req, res) => {
  const user = { ...req.user };
  delete user.password;
  delete user.role;

  return res.status(200).json({
    success: true,
    status: 200,
    data: user,
  });
});

// @route   GET /api/v1/user/:id
// @access  Protected/Admin
// @desc    Get the user by specifying id.
const getUser = asyncHandler(async (req, res) => {
  const [result] = await User.getUserById(req.params.id);
  const user = result[0] ? result[0] : null;
  if (user) delete user.password;

  const success = !!user;
  const status = user ? 200 : 404;

  return res.status(status).json({
    success,
    status,
    data: user,
  });
});

module.exports = {
  getMyAccount,
  getUser,
};
