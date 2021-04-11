import { Constructor } from '@jeafio/data';

export type ComponentResolver<T> = (resolvedComponents: Constructor[]) => T;
