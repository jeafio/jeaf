import { ComponentScope } from './ComponentScope';
import { ComponentResolver } from './ComponentResolver';

export interface ComponentConfig {
  name?: string;
  scope?: ComponentScope;
  primary?: boolean;
  resolver?: ComponentResolver<object>;
}
