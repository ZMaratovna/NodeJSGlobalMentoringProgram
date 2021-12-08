import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();
const alphaNumRegex = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
const messages = {
  pwd: 'password must contain letters and numbers',
  age: 'Age must be between 4 and 130',
};

const userSchema = Joi.object({
    login: Joi.string().required().email(),
    password: Joi.string().regex(alphaNumRegex).message(messages.pwd).required(),
    age: Joi.number().integer().min(4).max(130).message(messages.age).required(),
    isDeleted: Joi.bool()
  })

export const userValidator = validator.body(userSchema);

