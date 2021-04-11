import { RequestParam } from './RequestParam';

describe('@RequestParam', () => {
  it('should define metadata on class', () => {
    @RequestParam('filter', 'test')
    class A {}

    expect(Reflect.getMetadata('http:requestParam', A)).toEqual({
      filter: 'test',
    });
  });

  it('should define metadata on method', () => {
    class A {
      @RequestParam('filter', 'test')
      public test(): void {}
    }

    expect(Reflect.getMetadata('http:requestParam', A, 'test')).toEqual({
      filter: 'test',
    });
  });
});
