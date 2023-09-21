import type yup from 'yup';

export type validatorsProps = yup.ObjectSchema<Record<string, yup.Schema<any, any, any, any>>>;
