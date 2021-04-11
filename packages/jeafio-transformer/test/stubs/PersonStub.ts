import { Person } from '../types/Person';
import { AddressStub } from './AddressStub';

const p = new Person();
p.name = 'max';
p.age = 23;
p.address = AddressStub;

export const PersonStub = p;
