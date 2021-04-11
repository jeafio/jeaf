import { Constructor } from '@jeafio/data';
import { ComponentResolver } from '../ComponentResolver';
import 'reflect-metadata';
import { Container } from '../Container';
import { getComponentDependencies } from '../functions/getComponentDependencies';

export function instanceResolver<T extends object>(
  container: Container,
  component: Constructor<T>,
): ComponentResolver<T> {
  return (resolvedComponents: Constructor[]): T => {
    const componentDependencies = getComponentDependencies(component);
    const resolvedArgs = componentDependencies.args.map((value) => container.resolve(value as Constructor));
    const instance: T = new component(...resolvedArgs);
    for (const property in componentDependencies.properties) {
      const dependency = componentDependencies.properties[property];
      instance[property as keyof T] = container.resolve(dependency as Constructor, resolvedComponents) as never;
    }
    return instance;
  };
}
