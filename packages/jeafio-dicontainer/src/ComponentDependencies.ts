import { Constructor } from '@jeafio/data';

export interface ComponentDependencies {
  args: (string | Constructor)[];
  properties: Record<string, string | Constructor>;
}
