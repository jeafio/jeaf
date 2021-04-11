import { camelCase } from './camelCase';

describe('camelCase', () => {
  it('should not capitalize first word', function () {
    expect(camelCase('name')).toEqual('name');
  });

  it('should capitalize second word', function () {
    expect(camelCase('address.city')).toEqual('addressCity');
  });
});
