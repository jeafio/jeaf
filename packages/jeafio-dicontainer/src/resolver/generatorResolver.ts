import { Container } from '../Container';
import { Constructor } from '@jeafio/data';
import { ComponentResolver } from '../ComponentResolver';

export function generatorResolver<T extends object, C extends Constructor>(
  container: Container,
  component: C,
  method: keyof InstanceType<C>,
): ComponentResolver<T> {
  return (resolvedComponents: Constructor[]): T => {
    const resolvedComponent = container.resolve(component, resolvedComponents) as InstanceType<C>;
    const resolvedMethod = resolvedComponent[method] as unknown;
    return (resolvedMethod as () => T)() as T;
  };
}
