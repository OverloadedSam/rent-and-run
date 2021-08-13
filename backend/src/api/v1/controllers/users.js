const { asyncHandler } = require('../middlewares');
const { User } = require('../models');
const { validateUserData } =
  require('../validations').user;

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

// @route   POST /api/v1/register/
// @access  Public
// @desc    Register user in DB.
const registerUser = asyncHandler(async (req, res) => {
  const userData = { ...req.body };

  // Validate user data to store it in DB.
  const { error } = validateUserData(userData);

  if (error) {
    const [validationError] = error.details;

    return res.status(422).json({
      success: false,
      status: 422,
      message: validationError.message,
      key: validationError.context.key,
    });
  }

  const user = new User(userData);
  await user.addUser();

  const token = user.generateAuthToken();
  delete userData.password;

  return res.status(201).header('x-auth-token', token).json({
    success: true,
    status: 201,
    data: userData,
    token,
  });
});

module.exports = {
  getMyAccount,
  getUser,
  registerUser,
};
