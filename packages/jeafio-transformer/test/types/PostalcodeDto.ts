import { Field } from '@jeafio/validate';

export class PostalcodeDto {
  @Field(String)
  public declare zip: string;
}
