import { Constructor } from '@jeafio/data';
import { ComponentResolver } from '../ComponentResolver';
import { instanceResolver } from './instanceResolver';
import { Container } from '../Container';

export function singletonResolver<T extends object>(
  container: Container,
  component: Constructor<T>,
): ComponentResolver<T> {
  let instance: T;
  return (resolvedComponents: Constructor[]): T => {
    if (!instance) {
      instance = instanceResolver(container, component)(resolvedComponents);
    }
    return instance;
  };
}
