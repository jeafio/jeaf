import { RequestHeader } from './RequestHeader';

describe('@RequestHeader', () => {
  it('should define metadata on class', () => {
    @RequestHeader('Content-Type', 'test')
    class A {}

    expect(Reflect.getMetadata('http:requestHeader', A)).toEqual({
      'Content-Type': 'test',
    });
  });

  it('should define metadata on method', () => {
    class A {
      @RequestHeader('Content-Type', 'test')
      public test(): void {}
    }

    expect(Reflect.getMetadata('http:requestHeader', A, 'test')).toEqual({
      'Content-Type': 'test',
    });
  });
});
