// validators/productValidator.js
const Joi = require('joi');
const mongoose = require('mongoose');

// Product validation schema
const productSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().min(5).max(500).required(),
  image: Joi.string().uri().required(),
});

// Validate product
const validateProduct = (product) => {
  return productSchema.validate(product);
};

// Validate ID
const validateId = (id) => {
  const schema = Joi.object({
    id: Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
  });
  return schema.validate({ id });
};

module.exports = {
  validateProduct,
  validateId,
};
