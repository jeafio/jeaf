import 'reflect-metadata';

export function RequestHeader(key: string, value: string | number) {
  return (target: object, propertyKey?: string): void => {
    if (typeof propertyKey === 'string') {
      const header = Reflect.getMetadata('http:requestHeader', target.constructor, propertyKey) || {};
      header[key] = value;
      Reflect.defineMetadata('http:requestHeader', header, target.constructor, propertyKey);
    } else {
      const header = Reflect.getMetadata('http:requestHeader', target) || {};
      header[key] = value;
      Reflect.defineMetadata('http:requestHeader', header, target);
    }
  };
}
