import { Container } from '../Container';
import { instanceResolver } from './instanceResolver';
import { Autowired, Component } from '../..';

jest.mock('../functions/getContainer', () => ({
  __esModule: true,
  getContainer: () => ({
    register: jest.fn(),
  }),
}));

describe('instanceResolver', () => {
  it('should resolve all constructor parameter', () => {
    class B {}
    const constructorSpy = jest.fn();
    @Component()
    class A {
      constructor(b: B) {
        constructorSpy(b);
      }
    }
    const instance = new B();
    const container = new Container();
    jest.spyOn(container, 'resolve').mockReturnValue(instance);
    const resolver = instanceResolver(container, A);
    expect(resolver([])).toBeInstanceOf(A);
    expect(container.resolve).toHaveBeenCalledWith(B);
    expect(constructorSpy).toHaveBeenCalledWith(expect.any(B));
  });

  it('should resolve all properties', () => {
    class B {}
    @Component()
    class A {
      @Autowired()
      public declare b: B;
    }
    const instance = new B();
    const container = new Container();
    jest.spyOn(container, 'resolve').mockReturnValue(instance);
    const resolver = instanceResolver(container, A);
    const resolvedInstance = resolver([]);
    expect(resolvedInstance).toBeInstanceOf(A);
    expect(resolvedInstance.b).toBe(instance);
    expect(container.resolve).toHaveBeenCalledWith(B, []);
  });
});
