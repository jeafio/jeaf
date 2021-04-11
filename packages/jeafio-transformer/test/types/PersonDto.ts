import { Field } from '@jeafio/validate';
import { AddressDto } from './AddressDto';

export class PersonDto {
  @Field(String)
  public declare name: string;

  @Field(Number)
  public declare age: number;

  @Field(AddressDto)
  public declare address: AddressDto;
}
