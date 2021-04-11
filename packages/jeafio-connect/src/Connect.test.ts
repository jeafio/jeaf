import { RequestPath } from '@jeafio/http';
import { Connect } from './Connect';

describe('Connect', () => {
  it('should ', () => {
    class A extends Connect {
      @RequestPath('GET', '/')
      public test(): void {}
    }

    class B extends A {
      @RequestPath('GET', '/')
      public test2(): void {}
    }

    new B();
  });
});
