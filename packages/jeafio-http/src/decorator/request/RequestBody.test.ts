import { RequestBody } from './RequestBody';
import 'reflect-metadata';

describe('@RequestBody', () => {
  it('should add metadata if used on method', () => {
    class A {
      @RequestBody('Test')
      public test(): void {}
    }

    expect(Reflect.getMetadata('http:requestBody', A, 'test')).toEqual({
      type: 'static',
      value: 'Test',
    });
  });

  it('should add metadata if used on parameter', () => {
    class A {
      public test(@RequestBody() a: string): void {}
    }

    expect(Reflect.getMetadata('http:requestBody', A, 'test')).toEqual({
      type: 'parameter',
      index: 0,
    });
  });
});
