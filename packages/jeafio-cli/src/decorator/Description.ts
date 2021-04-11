import 'reflect-metadata';

export function Description(description: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata('cli:description', description, target, propertyKey);
  };
}
