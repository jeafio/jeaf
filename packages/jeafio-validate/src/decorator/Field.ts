import { Validator } from '../Validator';
import 'reflect-metadata';
import { PrimitiveValues } from '../PrimitiveValues';

export function Field<T extends PrimitiveValues>(
  designType: T,
  validator?: Validator<T, never>[],
  itemValidator?: Validator<T, never>[],
): PropertyDecorator {
  return (target: object, propertyKey) => {
    const schema = Reflect.getMetadata('validate:schema', target.constructor) || {};
    const actualType = Reflect.getMetadata('design:type', target, propertyKey);
    const field = schema[propertyKey] || {};
    field.type = designType;
    field.validator = validator || [];
    field.itemValidator = itemValidator || [];
    field.isArray = actualType === Array;
    schema[propertyKey] = field;
    Reflect.defineMetadata('validate:schema', schema, target.constructor);
  };
}
