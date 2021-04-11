import { getContainer } from '../functions/getContainer';
import { Component } from './Component';

describe('Component', () => {
  it('should register component', () => {
    const container = getContainer();
    jest.spyOn(container, 'register');

    @Component()
    class A {}

    expect(container.register).toHaveBeenCalledWith(A, {});
  });

  it('should register component config', () => {
    const container = getContainer();
    jest.spyOn(container, 'register');

    @Component({ name: 'Test' })
    class A {}

    expect(container.register).toHaveBeenCalledWith(A, { name: 'Test' });
  });

  it('should throw an error if a primitive constructor parameter has been found', function () {
    expect(() => {
      @Component()
      class A {
        constructor(a: number) {}
      }
    }).toThrowError('Invalid constructor parameter found in A at index 0');
  });
});
