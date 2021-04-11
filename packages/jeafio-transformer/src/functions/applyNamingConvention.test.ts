import { applyNamingConvention } from './applyNamingConvention';
import { camelCase } from '../conventions/camelCase';

describe('applyNamingConvention', () => {
  const accessList = {
    street: 'street',
    city: 'city',
    postalcode: 'postalcode',
    'postalcode.country': 'postalcode.country',
    'postalcode.value': 'postalcode.value',
    country: 'postalcode.country',
    value: 'postalcode.value',
  };

  it('should apply convention on all keys', function () {
    expect(applyNamingConvention(accessList, camelCase)).toEqual({
      street: 'street',
      city: 'city',
      postalcode: 'postalcode',
      postalcodeCountry: 'postalcode.country',
      postalcodeValue: 'postalcode.value',
      country: 'postalcode.country',
      value: 'postalcode.value',
    });
  });
});
