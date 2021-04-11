import { getAccessList } from './getAccessList';
import { getPropertyPaths } from './getPropertyPaths';

describe('getAccessList', () => {
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
    country: 'de',
    address: address,
  };

  const customer = {
    person: person,
    country: 'de',
  };

  it('should return root level property mapping', () => {
    const propertyPaths = getPropertyPaths(postalcode);
    expect(getAccessList(propertyPaths)).toEqual({
      country: 'country',
      value: 'value',
    });
  });

  it('should return second level property mappings', function () {
    const propertyPaths = getPropertyPaths(address);
    expect(getAccessList(propertyPaths)).toEqual({
      street: 'street',
      city: 'city',
      postalcode: 'postalcode',
      'postalcode.country': 'postalcode.country',
      'postalcode.value': 'postalcode.value',
      country: 'postalcode.country',
      value: 'postalcode.value',
    });
  });

  it('should not allow direct access to properties that are not unique', function () {
    const propertyPaths = getPropertyPaths(customer);
    expect(getAccessList(propertyPaths)).toEqual({
      address: 'person.address',
      'address.city': 'person.address.city',
      'address.postalcode': 'person.address.postalcode',
      'address.postalcode.country': 'person.address.postalcode.country',
      'address.postalcode.value': 'person.address.postalcode.value',
      'address.street': 'person.address.street',
      age: 'person.age',
      city: 'person.address.city',
      country: 'country',
      name: 'person.name',
      person: 'person',
      'person.address': 'person.address',
      'person.address.city': 'person.address.city',
      'person.address.postalcode': 'person.address.postalcode',
      'person.address.postalcode.country': 'person.address.postalcode.country',
      'person.address.postalcode.value': 'person.address.postalcode.value',
      'person.address.street': 'person.address.street',
      'person.age': 'person.age',
      'person.country': 'person.country',
      'person.name': 'person.name',
      postalcode: 'person.address.postalcode',
      'postalcode.country': 'person.address.postalcode.country',
      'postalcode.value': 'person.address.postalcode.value',
      street: 'person.address.street',
      value: 'person.address.postalcode.value',
    });
  });
});
