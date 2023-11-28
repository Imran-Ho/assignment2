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
const orderValidationSchema = Joi.object({
  productName: Joi.string().optional(),
  price: Joi.number().optional(),
  quantity: Joi.number().optional(),
});

export const userValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required().trim(),
  password: Joi.string().required().max(20),
  fullName: fullNameValidationSchema,
  age: Joi.number(),
  email: Joi.string().email().message('Please provide a valid email address.'),
  isActive: Joi.boolean(),
  hobbies: Joi.array().items(Joi.string()),
  address: addressValidationSchema,
  orders: Joi.array().items(orderValidationSchema).optional(),
});

export const updateInfoValidation = Joi.object({
  userId: Joi.number().optional(),
  username: Joi.string().trim().required().optional(),
  password: Joi.string().max(20).optional(),
  fullName: fullNameValidationSchema.optional(),
  age: Joi.number().optional(),
  email: Joi.string()
    .email()
    .message('Please provide a valid email address.')
    .optional(),
  isActive: Joi.boolean().optional(),
  hobbies: Joi.array().items(Joi.string()).optional(),
  address: addressValidationSchema.optional(),
  orders: Joi.array().items(orderValidationSchema).optional(),
});
