import { Field } from '@jeafio/validate';

export class FlatPersonWithPostalcodeDto {
  @Field(String)
  public declare name: string;

  @Field(Number)
  public declare age: number;

  @Field(String)
  public declare addressCity: string;

  @Field(String)
  public declare addressStreet: string;

  @Field(String)
  public declare postalcodeZip: string;
}
