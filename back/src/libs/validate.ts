import { validatorsProps } from '@interfaces/request';
import * as yup from 'yup';

export const createValidator = (object: validatorsProps) => yup.object().shape(object);

export const stringValidator = yup.string();

export const emailValidator = yup.string().email();

export const roleValidator = yup.string().oneOf(['admin', 'user']);

export const passwordValidator = yup
  .string()
  .test(
    'password-validation',
    'Password must contain at least: one uppercase letter, one lowercase letter, one digit, one special character and a min of 8 characters',
    function (value: string | undefined) {
      if (!value) {
        return;
      }
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasDigit = /[0-9]/.test(value);
      const hasSpecial = /[^0-9A-Za-z]/.test(value);
      const hasMinimumLength = value && value.length >= 8;

      const errors = [];

      if (!hasUppercase) {
        errors.push('one uppercase letter');
      }
      if (!hasLowercase) {
        errors.push('one lowercase letter');
      }
      if (!hasDigit) {
        errors.push('one digit');
      }
      if (!hasSpecial) {
        errors.push('one special character');
      }
      if (!hasMinimumLength) {
        errors.push('a minimum of 8 characters');
      }

      if (errors.length > 0) {
        return this.createError({
          message: `Password must contain at least: ${errors.join(', ')}`,
        });
      }

      return true;
    },
  );
