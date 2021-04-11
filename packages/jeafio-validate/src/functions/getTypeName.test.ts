import { getTypeName } from './getTypeName';

describe('getTypeName', () => {
  it('should return "Boolean" for booleans', () => {
    expect(getTypeName(true)).toBe('Boolean');
    expect(getTypeName(false)).toBe('Boolean');
  });

  it('should return "Number" for numbers', () => {
    expect(getTypeName(2)).toBe('Number');
  });

  it('should return "String" for strings', () => {
    expect(getTypeName('Test')).toBe('String');
  });

  it('should return "Function" for functions', () => {
    expect(getTypeName(() => {})).toBe('Function');
  });

  it('should return "Symbol" for symbols', () => {
    expect(getTypeName(Symbol('T'))).toBe('Symbol');
  });

  it('should return "undefined" for undefined values', () => {
    expect(getTypeName(undefined)).toBe('undefined');
  });

  it('should return "null" for null values', () => {
    expect(getTypeName(null)).toBe('null');
  });
});
