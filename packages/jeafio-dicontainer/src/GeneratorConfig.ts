import { ComponentConfig } from './ComponentConfig';
import { Constructor } from '@jeafio/data';

export interface GeneratorConfig extends ComponentConfig {
  type: Constructor;
}
