import Joi from 'joi';

const fullNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .pattern(new RegExp(/^[a-zA-Z]+$/))
    .message('First name should only contain alphabetical characters.'),
  lastName: Joi.string()
    .required()
    .trim()
    .pattern(new RegExp(/^[a-zA-Z]+$/))
    .message('last name should only contain alphabetical characters.'),
});

const addressValidationSchema = Joi.object({
  street: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
});

const userValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required().trim(),
  password: Joi.string().required().max(20),
  fullName: fullNameValidationSchema,
  age: Joi.number(),
  email: Joi.string().email().message('Please provide a valid email address.'),
  isActive: Joi.boolean(),
  hobbies: Joi.string().valid('fishing', 'traveling'),
  address: addressValidationSchema,
});

export default userValidationSchema;
