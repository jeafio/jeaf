import 'reflect-metadata';
import { ComponentConfig } from '../ComponentConfig';
import { Constructor } from '@jeafio/data';
import { getContainer } from '../functions/getContainer';
import { isPrimitive } from '../functions/isPrimitive';

/**
 * Indicates that an annotated class is a "component". Such
 * classes are considered as candidates for auto-wiring.
 * @param config
 * @constructor
 */
export function Component(config: ComponentConfig = {}) {
  return (target: Constructor): void => {
    const constructorParams = Reflect.getMetadata('design:paramtypes', target) || [];
    constructorParams.forEach((type: unknown, index: number) => {
      if (isPrimitive(type)) {
        throw new Error(`Invalid constructor parameter found in ${target.name} at index ${index}`);
      }
    });
    getContainer().register(target, config);
  };
}
