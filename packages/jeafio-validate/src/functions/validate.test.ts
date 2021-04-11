import { Field, Null, Optional, validate } from '../..';
import { PersonDto } from '../../test/types/PersonDto';
import { AddressDto } from '../../test/types/AddressDto';
import { ArrayDto } from '../../test/types/ArrayDto';
import { Validator } from '../Validator';
import { min } from '../validator/min';

describe('validate', () => {
  it('should validate a simple object', () => {
    const obj = {
      name: 'max',
      age: 32,
    };

    expect(validate(obj, PersonDto)).toEqual({ isValid: true, errors: [] });
  });

  it('should detect invalid types', () => {
    const obj = {
      name: 'max',
      age: true,
    };

    expect(validate(obj, PersonDto)).toEqual({
      errors: [
        {
          field: 'age',
          message: "Expected 'Number' but got 'Boolean'",
          type: 'INVALID_TYPE',
        },
      ],
      isValid: false,
    });
  });

  it('should ignore unknown properties', () => {
    const obj = {
      name: 'max',
      age: 32,
    };

    expect(validate(obj, PersonDto, { allowUnknown: true })).toEqual({ isValid: true, errors: [] });
  });

  it('should detect unknown properties', () => {
    const obj = {
      name: 'max',
      age: 32,
      isEmployee: true,
    };

    expect(validate(obj, PersonDto)).toEqual({
      errors: [
        {
          field: 'isEmployee',
          message: "Unknown field 'isEmployee'",
          type: 'UNKNOWN_FIELD',
        },
      ],
      isValid: false,
    });
  });

  it('should validate a simple array of objects', () => {
    const obj = {
      name: 'max',
      age: 32,
    };

    expect(validate([obj, obj], PersonDto)).toEqual({ isValid: true, errors: [] });
  });

  it('should create validation error if value is not allowed to be undefined', () => {
    const obj = {
      name: 'max',
    };

    class Person {
      @Field(String)
      public declare name: string;

      @Field(Number)
      public declare age: number;
    }

    expect(validate(obj, Person)).toEqual({
      errors: [
        {
          field: 'age',
          message: "Received undefined in field 'age'",
          type: 'UNDEFINED_TYPE',
        },
      ],
      isValid: false,
    });
  });

  it('should allow undefined if the property is marked optional', () => {
    const obj = {
      name: 'max',
    };

    class Person {
      @Field(String)
      public declare name: string;

      @Field(Number)
      @Optional
      public declare age: number;
    }

    expect(validate(obj, Person)).toEqual({
      errors: [],
      isValid: true,
    });
  });

  it('should create validation error if value is not allowed to be null', () => {
    const obj = {
      name: 'max',
      age: null,
    };

    class Person {
      @Field(String)
      public declare name: string;

      @Field(Number)
      public declare age: number;
    }

    expect(validate(obj, Person)).toEqual({
      errors: [
        {
          field: 'age',
          message: "Received null in field 'age'",
          type: 'NULL_TYPE',
        },
      ],
      isValid: false,
    });
  });

  it('should allow null if the property is marked nullable', () => {
    const obj = {
      name: 'max',
      age: null,
    };

    class Person {
      @Field(String)
      public declare name: string;

      @Field(Number)
      @Null
      public declare age: number;
    }

    expect(validate(obj, Person)).toEqual({
      errors: [],
      isValid: true,
    });
  });

  it('should validate deep objects', () => {
    const obj = {
      street: 'test',
      person: {
        name: 'max',
        age: 32,
      },
    };
    expect(validate(obj, AddressDto)).toEqual({
      errors: [],
      isValid: true,
    });
  });

  it('should detect wrong sub objects', () => {
    const obj = {
      street: 'test',
      person: {
        name: 'max',
      },
    };
    expect(validate(obj, AddressDto)).toEqual({
      errors: [
        {
          field: 'person.age',
          message: "Received undefined in field 'person.age'",
          type: 'UNDEFINED_TYPE',
        },
      ],
      isValid: false,
    });
  });

  it('should validate arrays in properties', () => {
    const obj = {
      persons: [
        { name: 'max', age: 32 },
        { name: 'tom', age: 15 },
      ],
    };
    expect(validate(obj, ArrayDto)).toEqual({
      isValid: true,
      errors: [],
    });
  });

  it('should detect errors in arrays in properties', () => {
    const obj = {
      persons: [{ name: 'max', age: 32 }, { name: 'tom' }],
    };
    expect(validate(obj, ArrayDto)).toEqual({
      errors: [
        {
          field: 'persons[1].age',
          message: "Received undefined in field 'persons[1].age'",
          type: 'UNDEFINED_TYPE',
        },
      ],
      isValid: false,
    });
  });

  it('should run all validators on all properties', () => {
    const obj = {
      age: 18,
    };

    const spy = jest.fn();

    function min(min: number): Validator<NumberConstructor, number> {
      return {
        type: Number,
        name: 'min',
        validator: spy,
      };
    }

    class Person {
      @Field(Number, [min(18)])
      public declare age: number;
    }

    expect(validate(obj, Person)).toEqual({
      isValid: true,
      errors: [],
    });
    expect(spy).toHaveBeenCalledWith(18, 'age', obj);
  });

  it('should return validator errors', () => {
    const obj = {
      age: 15,
    };

    class Person {
      @Field(Number, [min(18)])
      public declare age: number;
    }

    expect(validate(obj, Person)).toEqual({
      errors: [
        {
          field: 'age',
          message: 'Expected value to be greater or equal 18',
          type: 'NUMBER_MIN',
        },
      ],
      isValid: false,
    });
  });

  it('should call validator on all array items', () => {
    const obj = {
      ages: [15, 17, 19],
    };

    const spy = jest.fn();

    function v(): Validator<NumberConstructor, number> {
      return {
        type: Number,
        name: 'min',
        validator: spy,
      };
    }

    class Person {
      @Field(Number, [], [v()])
      public declare ages: number[];
    }

    expect(validate(obj, Person)).toEqual({
      errors: [],
      isValid: true,
    });
    expect(spy).toHaveBeenCalledWith(15, 'ages[0]', obj);
    expect(spy).toHaveBeenCalledWith(17, 'ages[1]', obj);
    expect(spy).toHaveBeenCalledWith(19, 'ages[2]', obj);
  });
});
