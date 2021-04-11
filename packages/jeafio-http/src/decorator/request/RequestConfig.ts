import 'reflect-metadata';
import { HttpRequestMeta } from '../../HttpRequestMeta';

export function RequestConfig(config: HttpRequestMeta['requestConfig']) {
  return (target: object, propertyKey?: string): void => {
    if (typeof propertyKey === 'string') {
      Reflect.defineMetadata('http:requestConfig', config, target.constructor, propertyKey);
    } else {
      Reflect.defineMetadata('http:requestConfig', config, target);
    }
  };
}
