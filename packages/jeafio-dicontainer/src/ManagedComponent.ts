import { ComponentConfig } from './ComponentConfig';
import { Constructor } from '@jeafio/data';
import { ComponentResolver } from './ComponentResolver';

export interface ManagedComponent extends ComponentConfig {
  type: Constructor;
  resolver: ComponentResolver<object>;
}
