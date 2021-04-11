import { Field } from './Field';
import 'reflect-metadata';
import { Null } from './Null';

describe('Null', () => {
  it('should set isNullable for field to true', () => {
    class A {
      @Field(String)
      @Null
      public declare name: string;
    }

    expect(Reflect.getMetadata('validate:schema', A)).toEqual({
      name: {
        isNullable: true,
        isArray: false,
        type: String,
        validator: [],
        itemValidator: [],
      },
    });
  });
});
