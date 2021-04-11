import { Field } from '../../src/decorator/Field';
import { PersonDto } from './PersonDto';

export class AddressDto {
  @Field(String)
  public declare street: string;

  @Field(PersonDto)
  public declare person: PersonDto;
}
