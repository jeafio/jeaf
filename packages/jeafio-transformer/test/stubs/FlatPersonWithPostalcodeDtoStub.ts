import { FlatPersonWithPostalcodeDto } from '../types/FlatPersonWithPostalcodeDto';

const p = new FlatPersonWithPostalcodeDto();
p.addressCity = 'Munich';
p.addressStreet = 'Test 123';
p.postalcodeZip = '123';
p.age = 22;
p.name = 'Max';

export const FlatPersonWithPostalcodeDtoStub = p;
