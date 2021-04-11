export function Optional(target: object, propertyKey: string): void {
  const schema = Reflect.getMetadata('validate:schema', target.constructor) || {};
  const field = schema[propertyKey] || {};
  field.isOptional = true;
  schema[propertyKey] = field;
  Reflect.defineMetadata('validate:schema', schema, target.constructor);
}
