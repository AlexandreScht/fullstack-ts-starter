// import merge from 'deepmerge';
import * as yup from 'yup';
import { emailValidator, passwordValidator, stringValidator } from './validates';

export const createValidator = (object: Record<string, yup.Schema<any, any, any, any>>) => yup.object().shape(object);

//? register schema

export const registerSchemaValidator = createValidator({
  email: emailValidator.required(),
  password: passwordValidator.required(),
});

export const fullRegisterSchemaValidator = createValidator({
  email: yup.string().email().required(),
  password: yup.string().required(),
  token: yup.string().required(),
});

//? login schema
export const loginSchemaValidator = createValidator({
  email: emailValidator.required(),
  password: stringValidator.required(),
});

export const fullLoginSchemaValidator = createValidator({
  email: emailValidator.required(),
  password: stringValidator.required(),
  token: yup.string().required(),
});

export const test = createValidator({
  email: emailValidator.required(),
});

//? google validation schema
export const googleSchemaValidator = createValidator({
  at_hash: stringValidator.required(),
  id_token: stringValidator.required(),
});

// ? confirm account schema
export const confirmAccountSchemaValidator = createValidator({
  accessToken: stringValidator.required(),
});
