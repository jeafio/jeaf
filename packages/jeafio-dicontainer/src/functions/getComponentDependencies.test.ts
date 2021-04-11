import { getComponentDependencies } from './getComponentDependencies';
import { Autowired, Component, Generator } from '../..';

jest.mock('./getContainer', () => ({
  __esModule: true,
  getContainer: () => ({
    register: jest.fn(),
  }),
}));

describe('getComponentMeta', function () {
  it('should return all constructor parameter', function () {
    @Component()
    class A {
      constructor(a: A) {}
    }

    expect(getComponentDependencies(A)).toEqual({
      properties: {},
      args: [A],
    });
  });

  it('should return constructor parameter that are named using @Autowired', function () {
    @Component()
    class A {
      constructor(a: A, @Autowired('test') b: A) {}
    }

    expect(getComponentDependencies(A)).toEqual({
      properties: {},
      args: [A, 'test'],
    });
  });

  it('should return all properties that are marked with @Autowired', function () {
    @Component()
    class A {
      @Autowired()
      public declare a: A;

      constructor(a: A, @Autowired('test') b: A) {}
    }

    expect(getComponentDependencies(A)).toEqual({
      properties: {
        a: A,
      },
      args: [A, 'test'],
    });
  });
});
