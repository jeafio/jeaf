import { Field } from './src/decorator/Field';
import { validate } from './src/functions/validate';
import { min } from './src/validator/min';

class Address {
  @Field(Number)
  public declare zip: number;
}

class Estate {
  @Field(String)
  public declare street: string;

  @Field(Address)
  public declare address: Address;
}

class Person {
  @Field(Number, [min(3)])
  public declare name: number;

  @Field(Number, [], [min(3)])
  public declare estates: number[];
}

const errors = validate(
  {
    name: 2,
    estates: [1, 2, 3, 4],
    test: 's',
  },
  Person,
  { allowUnknown: true },
);

console.log(errors);
