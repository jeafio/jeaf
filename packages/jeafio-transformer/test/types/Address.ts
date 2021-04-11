import { Field } from '@jeafio/validate';

export class Address {
  @Field(String)
  public declare street: string;

  @Field(String)
  public declare city: string;
}
