import { ResponseMiddleware } from './ResponseMiddleware';

describe('@RequestMiddleware', () => {
  it('should add metadata to class', () => {
    @ResponseMiddleware({} as any)
    class A {}
    expect(Reflect.getMetadata('http:responseMiddlewares', A)).toEqual([{}]);
  });

  it('should add metadata to method', () => {
    class A {
      @ResponseMiddleware({} as any)
      public test(): void {}
    }
    expect(Reflect.getMetadata('http:responseMiddlewares', A, 'test')).toEqual([{}]);
  });
});
