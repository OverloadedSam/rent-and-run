const jwt = require('jsonwebtoken');
const config = require('config');
const { ErrorResponse } = require('../utils');
const { User } = require('../models');

const protect = async (req, res, next) => {
  let token;
  const key = config.get('SECRET_KEY');

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    [, token] = req.headers.authorization.split(' ');
  }

  if (!token) {
    return next(
      new ErrorResponse(404, 'No authorization token was found in the request')
    );
  }

  try {
    const payload = jwt.verify(token, key);

    let [user] = await User.getUserById(payload.id);
    user = user[0] ? user[0] : null;

    if (!user) {
      return next(
        new ErrorResponse(401, 'User not found with the given token')
      );
    }

    req.user = user;
  } catch (error) {
    next(error);
  }

  next();
};

module.exports = protect;
