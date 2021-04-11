import { Field } from '../../src/decorator/Field';

export class PersonDto {
  @Field(String)
  public declare name: string;

  @Field(Number)
  public declare age: number;

  public declare privateProp: string;
}
