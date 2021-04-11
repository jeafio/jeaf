import { Container } from './Container';
import { ComponentScope } from './ComponentScope';
import { Component } from './decorator/Component';
import { Autowired } from './decorator/Autowired';
import { Generator } from './decorator/Generator';

jest.mock('./functions/getContainer', () => ({
  __esModule: true,
  getContainer: () => ({
    register: jest.fn(),
  }),
}));

describe('DIContainer', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should return true if component is registered', () => {
    class A {}

    container.register(A);
    expect(container.has(A)).toBe(true);
  });

  it('should return false if component does not exist', () => {
    class A {}

    expect(container.has(A)).toBe(false);
  });

  it('should resolve a single class by its type', () => {
    class A {}

    container.register(A);
    expect(container.resolve(A)).toBeInstanceOf(A);
  });

  it('should throw an error if type is not defined', () => {
    class A {}

    expect(() => {
      container.resolve(A);
    }).toThrowError(`Could not resolve A. Component not found.`);
  });

  it('should resolve a single class by its name', () => {
    class A {}

    container.register(A, { name: 'Test' });
    expect(container.resolve('Test')).toBeInstanceOf(A);
  });

  it('should throw an error if name is not defined', () => {
    expect(() => {
      container.resolve('Test');
    }).toThrowError(`Could not resolve qualifier Test. Component not found.`);
  });

  it('should resolve new instances of a single class', () => {
    class A {}

    container.register(A, { scope: ComponentScope.INSTANCE });
    expect(container.resolve(A)).not.toBe(container.resolve(A));
  });

  it('should resolve singletons of a single class', () => {
    class A {}

    container.register(A, { scope: ComponentScope.SINGLETON });
    expect(container.resolve(A)).toBe(container.resolve(A));
  });

  it('should resolve constructor parameter of a class', () => {
    const constructorSpy = jest.fn();

    class B {}

    @Component()
    class A {
      constructor(b: B) {
        constructorSpy(b);
      }
    }

    container.register(B);
    container.register(A);
    expect(container.resolve(A)).toBeInstanceOf(A);
    expect(constructorSpy).toHaveBeenCalledWith(expect.any(B));
  });

  it('should resolve multiple constructor parameter of a class', () => {
    const constructorSpy = jest.fn();

    class B {}

    class C {}

    @Component()
    class A {
      constructor(b: B, c: C) {
        constructorSpy(b, c);
      }
    }

    container.register(C);
    container.register(B);
    container.register(A);
    expect(container.resolve(A)).toBeInstanceOf(A);
    expect(constructorSpy).toHaveBeenCalledWith(expect.any(B), expect.any(C));
  });

  it('should resolve named constructor parameter of a class', () => {
    const constructorSpy = jest.fn();

    class B {}

    @Component()
    class A {
      constructor(@Autowired('Test') b: B) {
        constructorSpy(b);
      }
    }

    container.register(B, { name: 'Test' });
    container.register(A);
    expect(container.resolve(A)).toBeInstanceOf(A);
    expect(constructorSpy).toHaveBeenCalledWith(expect.any(B));
  });

  it('should resolve autowired properties', () => {
    class B {}

    class A {
      @Autowired()
      public declare b: B;
    }

    container.register(B);
    container.register(A);
    const a = container.resolve(A);
    expect(a).toBeInstanceOf(A);
    expect(a.b).toBeInstanceOf(B);
  });

  it('should resolve multiple autowired properties', () => {
    class B {}

    class C {}

    class A {
      @Autowired()
      public declare b: B;

      @Autowired()
      public declare c: C;
    }

    container.register(B);
    container.register(C);
    container.register(A);
    const a = container.resolve(A);
    expect(a).toBeInstanceOf(A);
    expect(a.b).toBeInstanceOf(B);
    expect(a.c).toBeInstanceOf(C);
  });

  it('should resolve named autowired properties', () => {
    class B {}

    class A {
      @Autowired('Test')
      public declare b: B;
    }

    container.register(B, { name: 'Test' });
    container.register(A);
    const a = container.resolve(A);
    expect(a).toBeInstanceOf(A);
    expect(a.b).toBeInstanceOf(B);
  });

  it('should resolve component from generator', () => {
    const generatorSpy = jest.fn();

    class B {}

    class C {
      @Generator()
      public buildB(): B {
        generatorSpy();
        return new B();
      }
    }

    class A {
      @Autowired()
      public declare b: B;
    }

    container.register(C);
    container.register(A);
    const instance = container.resolve(A);
    expect(instance.b).toBeInstanceOf(B);
    expect(generatorSpy).toHaveBeenCalled();
  });

  it('should resolve named component from generator', () => {
    const generatorSpy = jest.fn();

    class B {}

    class C {
      @Generator({ name: 'Test' })
      public buildB(): B {
        generatorSpy();
        return new B();
      }
    }

    class A {
      @Autowired('Test')
      public declare b: B;
    }

    container.register(C);
    container.register(A);
    const instance = container.resolve(A);
    expect(instance.b).toBeInstanceOf(B);
    expect(generatorSpy).toHaveBeenCalled();
  });

  it('should resolve child class if parent is not registered', () => {
    class A {}

    class B extends A {}

    class C {
      @Autowired()
      public declare a: A;
    }

    container.register(B);
    container.register(C);
    const instance = container.resolve(C);
    expect(instance.a).toBeInstanceOf(A);
    expect(instance.a).toBeInstanceOf(B);
  });

  it('should resolve primary component', () => {
    class A {}

    class B extends A {}

    class C extends A {}

    class D {
      @Autowired()
      public declare a: A;
    }

    container.register(B);
    container.register(C, { primary: true });
    container.register(D);
    const instance = container.resolve(D);
    expect(instance.a).toBeInstanceOf(A);
    expect(instance.a).toBeInstanceOf(C);
    expect(instance.a).not.toBeInstanceOf(B);
  });

  it('should throw error if multiple components matches request', () => {
    class A {}

    class B extends A {}

    class C extends A {}

    class D {
      @Autowired()
      public declare a: A;
    }

    container.register(B);
    container.register(C);
    container.register(D);
    expect(() => {
      container.resolve(D);
    }).toThrowError('Could not resolve A. Found multiple components that would satisfy the request: B,C');
  });

  it('should resolve primary named component', () => {
    class A {}

    class B {}

    container.register(A, { name: 'Test', primary: true });
    container.register(B, { name: 'Test' });
    expect(container.resolve('Test')).toBeInstanceOf(A);
  });

  it('should throw error if multiple named components matches the request', () => {
    class A {}

    class B {}

    container.register(A, { name: 'Test' });
    container.register(B, { name: 'Test' });
    expect(() => {
      container.resolve('Test');
    }).toThrowError('Could not resolve Test. Found multiple components with the same name: A, B');
  });

  it('should resolve primary generator', () => {
    const generatorSpy = jest.fn();

    class B {}

    class A {
      @Generator({ primary: true })
      buildB(): B {
        generatorSpy();
        return new B();
      }
    }

    container.register(B);
    container.register(A);
    container.resolve(B);
    expect(generatorSpy).toHaveBeenCalled();
  });

  it('should detect circular dependencies', () => {
    class A {
      @Autowired()
      public declare a: A;
    }

    container.register(A);

    expect(() => {
      container.resolve(A);
    }).toThrowError('Detected circular dependency (A -> A)');
  });

  it('should inherit autowired props', () => {
    class B {}
    class A {
      @Autowired()
      public declare b: B;
    }
    class C extends A {}
    container.register(A);
    container.register(B);
    container.register(C);
    const instance = container.resolve(C);
    expect(instance.b).toBeInstanceOf(B);
  });

  it('should inherit constructor props', () => {
    const constructorSpy = jest.fn();
    class B {}
    @Component()
    class A {
      constructor(b: B) {
        constructorSpy(b);
      }
    }
    @Component()
    class C extends A {}
    container.register(A);
    container.register(B);
    container.register(C);
    container.resolve(C);
    expect(constructorSpy).toHaveBeenCalledWith(expect.any(B));
  });
});
