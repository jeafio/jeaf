import { PersonDto } from './PersonDto';
import { Field } from '../../src/decorator/Field';

export class ArrayDto {
  @Field(PersonDto)
  public declare persons: PersonDto[];
}
