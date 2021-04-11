import { Generator } from './Generator';
import 'reflect-metadata';

describe('Generator', () => {
  it('should add generator to class meta', () => {
    class B {}

    class A {
      @Generator()
      buildData(): B {
        return new B();
      }
    }

    expect(Reflect.getMetadata('ioc:generators', A)).toEqual({
      buildData: { type: B },
    });
  });

  it('should add generator config to class meta', () => {
    class B {}

    class A {
      @Generator({ name: 'Test' })
      buildData(): B {
        return new B();
      }
    }

    expect(Reflect.getMetadata('ioc:generators', A)).toEqual({
      buildData: { type: B, name: 'Test' },
    });
  });

  it('should throw an error if return type is invalid', () => {
    expect(() => {
      class A {
        @Generator()
        buildData(): number {
          return 0;
        }
      }
    }).toThrowError(`Invalid generator return type found in A for method buildData.`);
  });
});
