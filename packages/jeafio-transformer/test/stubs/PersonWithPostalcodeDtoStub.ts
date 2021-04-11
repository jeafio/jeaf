import { AddressWithPostalcodeDto } from '../types/AddressWithPostalcodeDto';
import { PersonWithPostalcodeDto } from '../types/PersonWithPostalcodeDto';
import { PostalcodeDto } from '../types/PostalcodeDto';

const plz = new PostalcodeDto();
plz.zip = '85604';

const a = new AddressWithPostalcodeDto();
a.city = 'Munich';
a.street = 'Test 12';
a.postalcode = plz;

const p = new PersonWithPostalcodeDto();
p.name = 'max';
p.age = 23;
p.address = a;

export const PersonWithPostalcodeDtoStub = p;
