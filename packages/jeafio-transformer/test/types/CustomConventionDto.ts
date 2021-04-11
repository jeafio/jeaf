import { Field } from '@jeafio/validate';

export class CustomConventionDto {
  @Field(String)
  public declare name: string;

  @Field(String)
  public declare address_street: string;
}
