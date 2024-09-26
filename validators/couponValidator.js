const Joi = require('joi');

// Validate coupon data
const validateCoupon = (data) => {
  const schema = Joi.object({
    code: Joi.string().required().min(3).max(50).messages({
      'string.base': 'Coupon code must be a string',
      'string.empty': 'Coupon code is required',
      'string.min': 'Coupon code must be at least 3 characters long',
      'string.max': 'Coupon code must be at most 50 characters long',
    }),
    discount: Joi.number().required().min(0).max(100).messages({
      'number.base': 'Discount must be a number',
      'number.empty': 'Discount is required',
      'number.min': 'Discount must be at least 0',
      'number.max': 'Discount must not exceed 100',
    }),
    expirationDate: Joi.date().required().greater('now').messages({
      'date.base': 'Expiration date must be a valid date',
      'date.empty': 'Expiration date is required',
      'date.greater': 'Expiration date must be in the future',
    }),
  });

  return schema.validate(data);
};

module.exports = {
  validateCoupon,
};
