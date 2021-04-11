import 'reflect-metadata';
import { isPrimitive } from '../functions/isPrimitive';

export function Autowired(name?: string) {
  return (target: object, propertyKey: string, parameterIndex?: number): void => {
    if (typeof parameterIndex !== 'undefined') {
      if (name) {
        const constructorParams = Reflect.getMetadata('ioc:constructor', target) || {};
        constructorParams[parameterIndex] = name;
        Reflect.defineMetadata('ioc:constructor', constructorParams, target);
      }
    } else {
      const properties = Reflect.getMetadata('ioc:properties', target.constructor) || {};
      const propertyType = Reflect.getMetadata('design:type', target, propertyKey);
      if (isPrimitive(propertyType)) {
        throw new Error(
          `Invalid property type found in ${target.constructor.name} for property ${propertyKey as string}.`,
        );
      }
      properties[propertyKey] = name || propertyType;
      Reflect.defineMetadata('ioc:properties', properties, target.constructor);
    }
  };
}
