import { RequestPath } from './RequestPath';

describe('@RequestPath', () => {
  it('should define metadata to method', () => {
    class A {
      @RequestPath('GET', '/test')
      public test(): void {}
    }

    expect(Reflect.getMetadata('http:requestPath', A, 'test')).toEqual({
      method: 'GET',
      path: '/test',
    });
  });

  it('should add method name to class requests', () => {
    class A {
      @RequestPath('GET', '/test')
      public test(): void {}
    }

    expect(Reflect.getMetadata('http:requests', A)).toEqual(['test']);
  });
});
