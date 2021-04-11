import { ComponentConfig } from '../ComponentConfig';
import { isPrimitive } from '../functions/isPrimitive';

export function Generator(config?: Omit<ComponentConfig, 'resolver'>): MethodDecorator {
  return (target, propertyKey): void => {
    const returnType = Reflect.getMetadata('design:returntype', target, propertyKey);
    if (isPrimitive(returnType)) {
      throw new Error(
        `Invalid generator return type found in ${target.constructor.name} for method ${propertyKey as string}.`,
      );
    }
    const generator = Reflect.getMetadata('ioc:generators', target.constructor) || {};
    generator[propertyKey] = { type: returnType, ...(config || {}) };
    Reflect.defineMetadata('ioc:generators', generator, target.constructor);
  };
}
