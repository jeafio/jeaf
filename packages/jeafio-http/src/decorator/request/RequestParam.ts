import 'reflect-metadata';

export function RequestParam(key: string, value: string | number) {
  return (target: object, propertyKey?: string): void => {
    if (typeof propertyKey === 'string') {
      const params = Reflect.getMetadata('http:requestParam', target.constructor, propertyKey) || {};
      params[key] = value;
      Reflect.defineMetadata('http:requestParam', params, target.constructor, propertyKey);
    } else {
      const params = Reflect.getMetadata('http:requestParam', target) || {};
      params[key] = value;
      Reflect.defineMetadata('http:requestParam', params, target);
    }
  };
}
