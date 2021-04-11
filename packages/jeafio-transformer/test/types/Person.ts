import { Field } from '@jeafio/validate';
import { Address } from './Address';

export class Person {
  @Field(String)
  public declare name: string;

  @Field(Number)
  public declare age: number;

  @Field(Address)
  public declare address: Address;
}
