import { RequestMiddleware } from './RequestMiddleware';

describe('@RequestMiddleware', () => {
  it('should add metadata to class', () => {
    @RequestMiddleware({} as any)
    class A {}
    expect(Reflect.getMetadata('http:requestMiddlewares', A)).toEqual([{}]);
  });

  it('should add metadata to method', () => {
    class A {
      @RequestMiddleware({} as any)
      public test(): void {}
    }
    expect(Reflect.getMetadata('http:requestMiddlewares', A, 'test')).toEqual([{}]);
  });
});
