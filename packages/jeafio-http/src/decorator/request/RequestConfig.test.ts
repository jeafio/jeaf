import { RequestConfig } from './RequestConfig';
import 'reflect-metadata';

describe('@RequestConfig', () => {
  it('should define metadata for method', () => {
    class A {
      @RequestConfig({})
      public test(): void {}
    }

    expect(Reflect.getMetadata('http:requestConfig', A, 'test')).toEqual({});
  });

  it('should define metadata for class', () => {
    @RequestConfig({})
    class A {}

    expect(Reflect.getMetadata('http:requestConfig', A)).toEqual({});
  });
});
