import { MappingFunction } from './MappingFunction';

export interface Mapping {
  fromKey: string;
  toKey: string;
  mappingFunction?: MappingFunction;
}
