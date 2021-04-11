import { getContainer } from '@jeafio/dicontainer';
import { Profile } from '../Profile';

export function Value(name: string): PropertyDecorator {
  return (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      get(): unknown {
        const container = getContainer();
        const profile = container.resolve(Profile);
        return profile.get(name);
      },
    });
  };
}
