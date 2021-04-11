import { min } from './min';

describe('min', () => {
  it('should return validation error if number is lower then min', () => {
    const v = min(10);
    expect(v.validator(5, 'age', {})).toEqual([
      {
        field: 'age',
        type: 'NUMBER_MIN',
        message: `Expected value to be greater or equal 10`,
      },
    ]);
  });

  it('should not return validation error if number is higher then min', () => {
    const v = min(10);
    expect(v.validator(15, 'age', {})).toBeUndefined();
  });

  it('should not return validation error if number is equal min', () => {
    const v = min(10);
    expect(v.validator(10, 'age', {})).toBeUndefined();
  });
});
