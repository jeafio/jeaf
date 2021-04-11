import { ValidationError } from './ValidationError';

export type Validator<F, T> = {
  type: F;
  name: string;
  validator: (value: T, field: string, obj: object) => ValidationError[] | void;
};
