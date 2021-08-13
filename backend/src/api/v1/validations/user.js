const Joi = require('joi');

const constraints = {
  first_name: Joi.string().min(3).max(64).trim().label('First name'),
  last_name: Joi.string().min(1).max(64).trim().label('Last name'),
  phone: Joi.string().min(10).max(10).label('Phone number'),
  email: Joi.string().email(),
  password: Joi.string().min(1).max(256).label('Password'),
};

const schema = Joi.object().keys(constraints);

// Validate user data that will be updated.
const validateUserUpdateData = (data) => schema.validate(data);

// Validate user data to register the user.
const validateUserData = (data) => {
  const extendedSchema = schema.keys({
    first_name: constraints.first_name.required(),
    phone: constraints.phone.required(),
    email: constraints.email.required(),
    password: constraints.password.required(),
  });

  return extendedSchema.validate(data);
};

module.exports = { validateUserUpdateData, validateUserData };
