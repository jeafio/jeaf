import { isPrimitive } from './isPrimitive';

describe('isPrimitive', function () {
  it('should return true if type is Number', function () {
    expect(isPrimitive(Number)).toBeTruthy();
  });

  it('should return true if type is Boolean', function () {
    expect(isPrimitive(Boolean)).toBeTruthy();
  });

  it('should return true if type is Function', function () {
    expect(isPrimitive(Function)).toBeTruthy();
  });

  it('should return true if type is String', function () {
    expect(isPrimitive(String)).toBeTruthy();
  });

  it('should return true if type is Symbol', function () {
    expect(isPrimitive(Symbol)).toBeTruthy();
  });

  it('should return true if type is Object', function () {
    expect(isPrimitive(Object)).toBeTruthy();
  });

  it('should return true if type is undefined', function () {
    expect(isPrimitive(undefined)).toBeTruthy();
  });

  it('should return true if type is null', function () {
    expect(isPrimitive(null)).toBeTruthy();
  });

  it('should not return true if type is a class', function () {
    class A {}
    expect(isPrimitive(A)).toBeFalsy();
  });
});
