import { Field } from '@jeafio/validate';

export class PersonWithAll {
  @Field(String)
  public declare name: string;

  @Field(Number)
  public declare age: number;

  @Field(String)
  public declare city: number;

  @Field(String)
  public declare street: number;

  @Field(String)
  public declare zip: number;

  @Field(String)
  public declare addressCity: string;

  @Field(String)
  public declare addressStreet: string;

  @Field(String)
  public declare addressPostalcodeZip: string;

  @Field(String)
  public declare postalcodeZip: string;
}
