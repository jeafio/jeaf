import { Field } from '@jeafio/validate';
import { FlatPersonDto } from './FlatPersonDto';

export class HousholdDto {
  @Field(FlatPersonDto)
  public declare persons: FlatPersonDto[];
}
