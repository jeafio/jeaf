import { Container } from '../Container';
import { generatorResolver } from './generatorResolver';

describe('generatorResolver', () => {
  it('should call a method on a resolved component', () => {
    class B {}
    class A {
      public getB(): B {
        return new B();
      }
    }
    const container = new Container();
    const instanceA = new A();
    const resolver = generatorResolver(container, A, 'getB');
    jest.spyOn(container, 'resolve').mockReturnValue(instanceA);
    jest.spyOn(instanceA, 'getB');
    expect(resolver([])).toBeInstanceOf(B);
    expect(instanceA.getB).toHaveBeenCalled();
  });
});
