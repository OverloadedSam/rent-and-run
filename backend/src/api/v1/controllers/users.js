const { asyncHandler } = require('../middlewares');
const { User } = require('../models');
const { ErrorResponse } = require('../utils');
const { validateUserData, validateUserUpdateData } =
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

// @route   PUT /api/v1/me/
// @access  Protected
// @desc    Register user in DB.
const updateUser = asyncHandler(async (req, res) => {
  const userData = { ...req.body };
  const userId = req.user.id;

  // Validate user data to be updated.
  const { error } = validateUserUpdateData(userData);

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
  await user.updateUser(userId);

  if (userData.password) delete userData.password;

  return res.status(200).json({
    success: true,
    status: 200,
    message: 'Account information has been updated successfully',
    data: userData,
  });
});

// @route   POST /api/v1/login
// @access  Public
// @desc    Log in the user by sending back auth-token.
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = { ...req.body };

  if (!email || !password) {
    return next(
      new ErrorResponse(400, 'Please provide both email and password!')
    );
  }

  const [result] = await User.getUserByEmail(email);
  const userFound = result[0] ? result[0] : null;

  if (!userFound) {
    return next(new ErrorResponse(404, 'You are not registered'));
  }

  const user = new User(userFound);

  if (!(await user.matchPassword(password))) {
    return next(new ErrorResponse(401, 'Please enter correct password!'));
  }

  const token = user.generateAuthToken();
  delete userFound.password;
  delete userFound.role;

  res.status(200).header('x-auth-token', token).json({
    success: true,
    status: 200,
    data: userFound,
    token,
  });
});

module.exports = {
  getMyAccount,
  getUser,
  registerUser,
  updateUser,
  loginUser,
};
