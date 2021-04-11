import 'reflect-metadata';
import { HttpRequestMeta } from '../../HttpRequestMeta';

export function RequestBody(value?: unknown) {
  return (target: object, propertyKey: string, parameterIndex?: unknown): void => {
    if (typeof parameterIndex === 'number') {
      Reflect.defineMetadata(
        'http:requestBody',
        {
          type: 'parameter',
          index: parameterIndex,
        } as HttpRequestMeta['requestBody'],
        target.constructor,
        propertyKey,
      );
    } else {
      Reflect.defineMetadata(
        'http:requestBody',
        {
          type: 'static',
          value,
        } as HttpRequestMeta['requestBody'],
        target.constructor,
        propertyKey,
      );
    }
  };
}
