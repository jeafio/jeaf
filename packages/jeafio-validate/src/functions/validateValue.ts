import { FieldSchema } from '../Schema';
import { ValidationError } from '../ValidationError';
import { getTypeName } from './getTypeName';
import { validateObject } from './validateObject';
import { ValidationConfig } from '../ValidationConfig';
import { appendToPath } from './appendToPath';
import { Constructor } from '@jeafio/data';

export function validateValue(
  value: unknown,
  field: string,
  obj: object,
  fieldSchema: FieldSchema,
  config?: ValidationConfig,
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check if the value is allowed to be undefined
  if (value === undefined && !fieldSchema.isOptional) {
    return [
      {
        message: `Received undefined in field '${field}'`,
        type: 'UNDEFINED_TYPE',
        field,
      },
    ];
  }

  // Check if the value is allowed to be null
  if (value === null && !fieldSchema.isNullable) {
    return [
      {
        message: `Received null in field '${field}'`,
        type: 'NULL_TYPE',
        field,
      },
    ];
  }

  if (value !== null && value !== undefined) {
    // Check if the value has the correct type
    if (typeof value !== 'object') {
      if (Object.getPrototypeOf(value).constructor !== fieldSchema.type) {
        return [
          {
            message: `Expected '${(fieldSchema.type as Constructor).name}' but got '${getTypeName(value)}'`,
            type: 'INVALID_TYPE',
            field,
          },
        ];
      }
    }

    // Run all validators on value
    if (Array.isArray(value) || typeof value !== 'object') {
      fieldSchema.validator.forEach((validatorConfig) => {
        const { validator } = validatorConfig;
        const validatorErrors = validator(value, field, obj);
        if (validatorErrors) {
          errors.push(...validatorErrors);
        }
      });

      // Validate array elements
      if (Array.isArray(value)) {
        value.forEach((itemValue, index) => {
          const itemErrors = validateValue(
            itemValue,
            appendToPath(field, `[${index}]`),
            obj,
            { ...fieldSchema, validator: fieldSchema.itemValidator, isOptional: true, isNullable: true },
            config,
          );
          errors.push(...itemErrors);
        });
      }
    } else {
      const objectSchema = Reflect.getMetadata('validate:schema', fieldSchema.type as Constructor);
      const objectErrors = validateObject(value as object, field, objectSchema, config);
      errors.push(...objectErrors);
    }
  }

  return errors;
}
