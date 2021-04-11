import { Constructor } from '@jeafio/data';
import { ComponentDependencies } from '../ComponentDependencies';
import 'reflect-metadata';

/**
 * Returns meta information that are added to a component
 * via the provided decorator
 * @param component
 */
export function getComponentDependencies(component: Constructor): ComponentDependencies {
  const constructorParams = Reflect.getMetadata('design:paramtypes', component) || [];
  const namedConstructorParams = Reflect.getMetadata('ioc:constructor', component) || {};
  const properties = Reflect.getMetadata('ioc:properties', component) || {};

  return {
    args: constructorParams.map((type: unknown, index: number) => namedConstructorParams[index] || type),
    properties,
  };
}
