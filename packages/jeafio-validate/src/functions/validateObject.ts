import { ValidationConfig } from '../ValidationConfig';
import { ValidationError } from '../ValidationError';
import { Schema } from '../Schema';
import { appendToPath } from './appendToPath';
import { validateValue } from './validateValue';

export function validateObject(
  obj: object,
  field: string,
  objectSchema: Schema,
  config?: ValidationConfig,
): ValidationError[] {
  const errors: ValidationError[] = [];
  const allowedKey = Object.keys(objectSchema);

  // Check if object has any unknown fields
  if (config && config.allowUnknown === false) {
    for (const key in obj) {
      if (!allowedKey.includes(key)) {
        errors.push({
          message: `Unknown field '${appendToPath(field, key)}'`,
          type: 'UNKNOWN_FIELD',
          field: appendToPath(field, key),
        });
      }
    }
  }

  for (const key in objectSchema) {
    const fieldValue = obj[key as keyof typeof obj];
    const fieldSchema = objectSchema[key];
    const fieldErrors = validateValue(fieldValue, appendToPath(field, key), obj, fieldSchema, config);
    errors.push(...fieldErrors);
  }

  return errors;
}
