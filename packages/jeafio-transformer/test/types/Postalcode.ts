import { Field } from '@jeafio/validate';

export class Postalcode {
  @Field(String)
  public declare zip: string;
}
