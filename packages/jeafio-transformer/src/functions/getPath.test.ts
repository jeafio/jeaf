import { getPath } from './getPath';

describe('getPath', () => {
  it('should return root path', function () {
    expect(getPath('', 'name')).toEqual('name');
  });

  it('should join paths', function () {
    expect(getPath('address', 'city')).toEqual('address.city');
  });
});
