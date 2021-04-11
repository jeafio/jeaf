import { ValidationConfig } from '../ValidationConfig';
import { validateObject } from './validateObject';
import { ValidationResult } from '../ValidationResult';
import { Constructor } from '@jeafio/data';

export function validate(value: object | object[], type: Constructor, config?: ValidationConfig): ValidationResult {
  const objectSchema = Reflect.getMetadata('validate:schema', type);
  let errors = [];
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const itemErrors = validateObject(value[i], `[${i}]`, objectSchema, { allowUnknown: false, ...config });
      errors.push(...itemErrors);
    }
  } else {
    errors = validateObject(value, '', objectSchema, { allowUnknown: false, ...config });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
