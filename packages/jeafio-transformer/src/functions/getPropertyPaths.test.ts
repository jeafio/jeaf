import { getPropertyPaths } from './getPropertyPaths';

describe('getPropertyPath', () => {
  const postalcode = {
    country: 'de',
    value: '803331',
  };

  const address = {
    street: 'test 12',
    city: 'munich',
    postalcode: postalcode,
  };

  const person = {
    name: 'max',
    age: 22,
    address: address,
  };

  it('should return all root level paths', function () {
    expect(getPropertyPaths(postalcode)).toEqual(['country', 'value']);
  });

  it('should return deep property paths', function () {
    expect(getPropertyPaths(person)).toEqual([
      'name',
      'age',
      'address',
      'address.street',
      'address.city',
      'address.postalcode',
      'address.postalcode.country',
      'address.postalcode.value',
    ]);
  });
});
