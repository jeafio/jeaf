import { Transformer } from './Transformer';
import { AddressStub } from '../test/stubs/AddressStub';
import { AddressDto } from '../test/types/AddressDto';
import { PersonStub } from '../test/stubs/PersonStub';
import { FlatPersonDto } from '../test/types/FlatPersonDto';
import { FlatPersonShortDto } from '../test/types/FlatPersonShortDto';
import { PersonDto } from '../test/types/PersonDto';
import { PersonWithAll } from '../test/types/PersonWithAll';
import { PersonWithPostalcodeDtoStub } from '../test/stubs/PersonWithPostalcodeDtoStub';
import { FlatPersonDtoStub } from '../test/stubs/FlatPersonDtoStub';
import { Person } from '../test/types/Person';
import { PersonWithPostalcodeDto } from '../test/types/PersonWithPostalcodeDto';
import { FlatPersonWithPostalcodeDtoStub } from '../test/stubs/FlatPersonWithPostalcodeDtoStub';
import { CustomConventionDto } from '../test/types/CustomConventionDto';
import { HousholdDto } from '../test/types/HousholdDto';

describe('Transformer', () => {
  const transformer = new Transformer();

  it('should convert deep arrays', function () {
    expect(
      transformer.transform(
        {
          persons: [
            {
              name: 'Max',
              age: 22,
              address: {
                street: 'Test 123',
                city: 'Munich',
              },
            },
            {
              name: 'Maria',
              age: 28,
              address: {
                street: 'Test 456',
                city: 'Munich',
              },
            },
          ],
        },
        HousholdDto,
      ),
    ).toEqual({
      persons: [
        {
          name: 'Max',
          age: 22,
          addressCity: 'Munich',
          addressStreet: 'Test 123',
        },
        {
          name: 'Maria',
          age: 28,
          addressCity: 'Munich',
          addressStreet: 'Test 456',
        },
      ],
    });
  });

  it('should convert arrays', function () {
    expect(transformer.transform([AddressStub, AddressStub], AddressDto)).toEqual([
      {
        street: 'Domagkstraße 12',
        city: 'Munich',
      },
      {
        street: 'Domagkstraße 12',
        city: 'Munich',
      },
    ]);
  });

  it('should support custom naming conventions', function () {
    const customTransformer = new Transformer().setNamingConvention((value) => {
      return value.split('.').join('_');
    });
    expect(
      customTransformer.transform(
        {
          name: 'Max',
          address: {
            street: 'Test 1234',
          },
        },
        CustomConventionDto,
      ),
    ).toEqual({
      name: 'Max',
      address_street: 'Test 1234',
    });
  });

  it('should transform flat object', () => {
    expect(transformer.transform(AddressStub, AddressDto)).toEqual({
      street: 'Domagkstraße 12',
      city: 'Munich',
    });
  });

  it('should transform deep objects to flat objects', function () {
    expect(transformer.transform(PersonStub, FlatPersonDto)).toEqual({
      age: 23,
      name: 'max',
      addressStreet: 'Domagkstraße 12',
      addressCity: 'Munich',
    });
  });

  it('should transform deep object to flat objects with short paths', function () {
    expect(transformer.transform(PersonStub, FlatPersonShortDto)).toEqual({
      age: 23,
      name: 'max',
      street: 'Domagkstraße 12',
      city: 'Munich',
    });
  });

  it('should transform deep object to deep object', function () {
    expect(transformer.transform(PersonStub, PersonDto)).toEqual({
      age: 23,
      name: 'max',
      address: {
        street: 'Domagkstraße 12',
        city: 'Munich',
      },
    });
  });

  it('should transform deep object with 3 levels to flat object', function () {
    expect(transformer.transform(PersonWithPostalcodeDtoStub, PersonWithAll)).toEqual({
      addressCity: 'Munich',
      addressPostalcodeZip: '85604',
      addressStreet: 'Test 12',
      age: 23,
      city: 'Munich',
      name: 'max',
      postalcodeZip: '85604',
      street: 'Test 12',
      zip: '85604',
    });
  });

  it('should transform flat object to deep object', function () {
    expect(transformer.transform(FlatPersonDtoStub, Person)).toEqual({
      name: 'Max',
      age: 22,
      address: {
        city: 'Munich',
        street: 'Test 123',
      },
    });
  });

  it('should transform flat object to deep object with 3 level', function () {
    expect(transformer.transform(FlatPersonWithPostalcodeDtoStub, PersonWithPostalcodeDto)).toEqual({
      name: 'Max',
      age: 22,
      address: {
        city: 'Munich',
        street: 'Test 123',
        postalcode: {
          zip: '123',
        },
      },
    });
  });

  it('should throw error if source object misses a required property', function () {
    const source = {
      addressCity: 'Munich',
      postalcodeZip: '123',
      age: 22,
      name: 'max',
    };

    expect(() => transformer.transform(source, PersonWithPostalcodeDto)).toThrowError(
      `Could not find a mapping for target key 'address.street'`,
    );
  });

  it('should not throw error if source object misses an optional property', function () {
    const source = {
      addressStreet: 'Test 123',
      postalcodeZip: '123',
      age: 22,
      name: 'Max',
    };

    expect(() => transformer.transform(source, PersonWithPostalcodeDto)).not.toThrow();
    expect(transformer.transform(source, PersonWithPostalcodeDto)).toEqual({
      name: 'Max',
      age: 22,
      address: {
        street: 'Test 123',
        postalcode: {
          zip: '123',
        },
      },
    });
  });

  it('should support custom mapping', function () {
    const customTransformer = new Transformer().addMapping('_street', 'street');
    expect(
      customTransformer.transform(
        {
          _street: 'Test 123',
          city: 'Munich',
        },
        AddressDto,
      ),
    ).toEqual({
      street: 'Test 123',
      city: 'Munich',
    });
  });

  it('should support custom value mapping', function () {
    const mappingFunction = jest.fn().mockReturnValue('Blabla');
    const customTransformer = new Transformer().addMapping('_street', 'street', mappingFunction);
    expect(
      customTransformer.transform(
        {
          _street: 'Test 123',
          city: 'Munich',
        },
        AddressDto,
      ),
    ).toEqual({
      street: 'Blabla',
      city: 'Munich',
    });
    expect(mappingFunction).toHaveBeenCalledWith('Test 123');
  });

  it('should support deep source custom mappings', function () {
    const customTransformer = new Transformer()
      .addMapping('address.street', 'addressCity')
      .addMapping('address.city', 'addressStreet');
    expect(customTransformer.transform(PersonStub, FlatPersonDto)).toEqual({
      age: 23,
      name: 'max',
      addressCity: 'Domagkstraße 12',
      addressStreet: 'Munich',
    });
  });

  it('should support deep source custom mappings', function () {
    const customTransformer = new Transformer()
      .addMapping('address.street', 'address.city')
      .addMapping('address.city', 'address.street');
    expect(customTransformer.transform(PersonStub, PersonDto)).toEqual({
      age: 23,
      name: 'max',
      address: {
        city: 'Domagkstraße 12',
        street: 'Munich',
      },
    });
  });
});
