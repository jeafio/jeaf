import { getSchemaPaths } from './getSchemaPaths';
import { FlatPersonDto } from '../../test/types/FlatPersonDto';
import { Person } from '../../test/types/Person';

describe('getSchemaPaths', () => {
  it('should return paths of flat type', function () {
    expect(getSchemaPaths(FlatPersonDto)).toEqual(['name', 'age', 'addressCity', 'addressStreet']);
  });

  it('should return paths of deep type', function () {
    expect(getSchemaPaths(Person)).toEqual(['name', 'age', 'address', 'address.street', 'address.city']);
  });
});
