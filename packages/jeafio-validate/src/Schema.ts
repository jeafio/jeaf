import { Validator } from './Validator';

export interface FieldSchema {
  type: unknown;
  validator: Validator<unknown, unknown>[];
  itemValidator: Validator<unknown, unknown>[];
  isArray: boolean;
  isOptional: boolean;
  isNullable: boolean;
}

export interface Schema {
  [key: string]: FieldSchema;
}
