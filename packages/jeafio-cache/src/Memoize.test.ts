import { Cache } from './Cache';
import { Memoize } from './Memoize';

describe('Memoize', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should cache class methods with an annotation', () => {
    const fn = jest.fn();

    class A {
      @Cache()
      public add(a: number, b: number): number {
        fn();
        return a + b;
      }
    }

    const t = new A();
    t.add(1, 2);
    t.add(1, 2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should cache values to a max size', () => {
    const fn = jest.fn();
    const m = new Memoize(fn, { size: 2 });
    m.run(1, 2);
    m.run(1, 2);
    m.run(1, 2);
    m.run(1, 2);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should clear cache', () => {
    const fn = jest.fn();
    const m = new Memoize(fn);
    m.run(1, 2);
    m.run(1, 2);
    m.clear();
    m.run(1, 2);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should cache values', () => {
    const fn = jest.fn();
    const m = new Memoize(fn);
    m.run(1, 2);
    m.run(1, 2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should return correct value.', () => {
    const fn = jest.fn().mockImplementation((a, b) => a + b);
    const m = new Memoize(fn);
    expect(m.run(1, 2)).toBe(3);
    expect(m.run(1, 2)).toBe(3);
    expect(m.run(2, 2)).toBe(4);
  });

  it('should invalidate entries after a specified time', async () => {
    const fn = jest.fn();
    const m = new Memoize(fn, { time: 100 });
    m.run(1, 2);
    m.run(1, 2);
    await new Promise((r) => setTimeout(r, 150));
    m.run(1, 2);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
