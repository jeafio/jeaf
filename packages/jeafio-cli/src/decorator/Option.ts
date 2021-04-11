import 'reflect-metadata';

export function Option(flags: string, description?: string, defaultValue?: string | boolean): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const registeredOptions = Reflect.getMetadata('cli:options', target, propertyKey) || [];
    registeredOptions.push({ flags, description, defaultValue });
    Reflect.defineMetadata('cli:options', registeredOptions, target, propertyKey);
  };
}
