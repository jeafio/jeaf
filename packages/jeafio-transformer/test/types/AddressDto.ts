import { Field } from '@jeafio/validate';

export class AddressDto {
  @Field(String)
  public declare street: string;

  @Field(String)
  public declare city: string;
}
