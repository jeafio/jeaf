import { Field } from './Field';
import 'reflect-metadata';

describe('Field', () => {
  it('should add field to class meta', () => {
    class A {
      @Field(String)
      public declare name: string;
    }

    expect(Reflect.getMetadata('validate:schema', A)).toEqual({
      name: {
        type: String,
        validator: [],
        itemValidator: [],
        isArray: false,
      },
    });
  });

  it('should detect arrays', () => {
    class A {
      @Field(String)
      public declare names: string[];
    }

    expect(Reflect.getMetadata('validate:schema', A)).toEqual({
      names: {
        type: String,
        validator: [],
        itemValidator: [],
        isArray: true,
      },
    });
  });
});
