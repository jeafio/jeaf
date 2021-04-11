import { Field, Optional } from '@jeafio/validate';
import { PostalcodeDto } from './PostalcodeDto';

export class AddressWithPostalcodeDto {
  @Field(String)
  public declare street: string;

  @Field(String)
  @Optional
  public declare city: string;

  @Field(PostalcodeDto)
  public declare postalcode: PostalcodeDto;
}
