import { ClientException, InvalidArgumentError } from '@/exceptions';
import { validatorsProps } from '@/interfaces/validation';
import { ObjectSchema, ValidationError } from 'yup';

const validate = (validators: validatorsProps, values: object): void | Error => {
  if (!(validators instanceof ObjectSchema)) {
    throw new InvalidArgumentError('validators is not a Yup schema');
  }
  const missingKeys = Object.keys(validators.fields).filter(key => !Object.keys(values).includes(key));

  if (missingKeys.length > 0) {
    throw new InvalidArgumentError(`Missing keys: ${missingKeys.join(', ')}`);
  }

  try {
    validators.validateSync(values);
    return;
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      throw new InvalidArgumentError(`Keys < ${err.path} > ${err.message}`);
    }
    throw new ClientException();
  }
};

export default validate;
