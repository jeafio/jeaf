import { Transformer } from './src/Transformer';
import { Person } from './test/types/Person';
import { PersonDto } from './test/types/PersonDto';
import { PersonStub } from './test/stubs/PersonStub';

const transformer = new Transformer();

const personDto = transformer.transform(PersonStub, PersonDto);
console.log(personDto);

const person = transformer.transform(personDto, Person);
console.log(person);
