import { Field } from '@jeafio/validate';

export class FlatPersonShortDto {
  @Field(String)
  public declare name: string;

  @Field(Number)
  public declare age: number;

  @Field(String)
  public declare city: string;

  @Field(String)
  public declare street: string;
}
