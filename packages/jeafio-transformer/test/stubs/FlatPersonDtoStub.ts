import { FlatPersonDto } from '../types/FlatPersonDto';

const p = new FlatPersonDto();
p.addressCity = 'Munich';
p.addressStreet = 'Test 123';
p.age = 22;
p.name = 'Max';

export const FlatPersonDtoStub = p;
