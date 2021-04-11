export function Null(target: object, propertyKey: string): void {
  const schema = Reflect.getMetadata('validate:schema', target.constructor) || {};
  const field = schema[propertyKey] || {};
  field.isNullable = true;
  schema[propertyKey] = field;
  Reflect.defineMetadata('validate:schema', schema, target.constructor);
}
