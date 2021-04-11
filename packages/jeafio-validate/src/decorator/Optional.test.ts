import { Field } from './Field';
import { Optional } from './Optional';
import 'reflect-metadata';

describe('Optional', () => {
  it('should set isOptional for field to true', () => {
    class A {
      @Field(String)
      @Optional
      public declare name: string;
    }

    expect(Reflect.getMetadata('validate:schema', A)).toEqual({
      name: {
        isOptional: true,
        isArray: false,
        type: String,
        validator: [],
        itemValidator: [],
      },
    });
  });
});
