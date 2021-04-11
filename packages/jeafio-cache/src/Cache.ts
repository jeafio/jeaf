import { Memoize } from './Memoize';

/**
 * Annotation to cache a method results.
 * @param config
 * @constructor
 */
export function Cache(config?: { size?: number; time?: number }): MethodDecorator {
  return (target, key, descriptor: PropertyDescriptor) => {
    const m = new Memoize(descriptor.value, config);
    descriptor.value = (...args: unknown[]) => {
      return m.run(...args);
    };
  };
}
