import { Autowired } from './Autowired';
import 'reflect-metadata';

describe('Autowired', () => {
  it('should register constructor params', () => {
    class A {
      constructor(@Autowired('test') a: A) {}
    }

    expect(Reflect.getMetadata('ioc:constructor', A)).toEqual({
      0: 'test',
    });
  });

  it('should ignore constructor params without a name', () => {
    class A {
      constructor(@Autowired() a: A, @Autowired('test') b: A) {}
    }

    expect(Reflect.getMetadata('ioc:constructor', A)).toEqual({
      1: 'test',
    });
  });

  it('should register autowired properties', () => {
    class A {
      @Autowired()
      public declare logger: A;
    }

    expect(Reflect.getMetadata('ioc:properties', A)).toEqual({
      logger: A,
    });
  });

  it('should register named autowired properties', () => {
    class A {
      @Autowired('test')
      public declare logger: A;
    }

    expect(Reflect.getMetadata('ioc:properties', A)).toEqual({
      logger: 'test',
    });
  });

  it('should throw an error if property has an invalid type', () => {
    expect(() => {
      class A {
        @Autowired()
        public declare test: number;
      }
    }).toThrowError(`Invalid property type found in A for property test.`);
  });
});
