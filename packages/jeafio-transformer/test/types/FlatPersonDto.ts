import { Field } from '@jeafio/validate';

export class FlatPersonDto {
  @Field(String)
  public declare name: string;

  @Field(Number)
  public declare age: number;

  @Field(String)
  public declare addressCity: string;

  @Field(String)
  public declare addressStreet: string;
}
