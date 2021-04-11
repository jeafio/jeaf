import { Field } from '@jeafio/validate';
import { AddressWithPostalcodeDto } from './AddressWithPostalcodeDto';

export class PersonWithPostalcodeDto {
  @Field(String)
  public declare name: string;

  @Field(Number)
  public declare age: number;

  @Field(AddressWithPostalcodeDto)
  public declare address: AddressWithPostalcodeDto;
}
