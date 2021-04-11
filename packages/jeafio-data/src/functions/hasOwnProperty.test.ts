import { hasOwnProperty } from './hasOwnProperty';

describe('hasOwnProperty', () => {
  it('should return true if the object has a given key', () => {
    expect(hasOwnProperty({ test: 1 }, 'test')).toBe(true);
  });

  it('should return false if the object does not have a given key', () => {
    expect(hasOwnProperty({ test: 1 }, 'test1234')).toBe(false);
  });

  it('should return false if the key exists only in the prototype', () => {
    expect(hasOwnProperty(Object, 'toString')).toBe(false);
    expect(Object.toString).toBeTruthy();
  });
});
