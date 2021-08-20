const Joi = require('joi');

const constraints = {
  coupon_code: Joi.string().min(3).max(16).trim().label('Coupon code'),
  discount_amount: Joi.number().min(1).label('Discount amount'),
  valid_till: Joi.string().min(10).label('Valid till'),
};

const schema = Joi.object().keys(constraints);

// Validate coupon data that will be updated.
const validateCouponUpdateData = (data) => schema.validate(data);

// Validate coupon data.
const validateCouponData = (data) => {
  const extendedSchema = schema.keys({
    coupon_code: constraints.coupon_code.required(),
    discount_amount: constraints.discount_amount.required(),
    valid_till: constraints.valid_till.required(),
  });

  return extendedSchema.validate(data);
};

module.exports = { validateCouponUpdateData, validateCouponData };
