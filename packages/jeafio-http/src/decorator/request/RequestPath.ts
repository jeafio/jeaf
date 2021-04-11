import 'reflect-metadata';
import { HttpRequestMethod } from '@jeafio/http';

export function RequestPath(method: HttpRequestMethod, path: string): MethodDecorator {
  return (target, propertyKey) => {
    const returnType = Reflect.getMetadata('design:returntype', target, propertyKey);
    const requests = Reflect.getMetadata('http:requests', target.constructor) || [];
    requests.push(propertyKey);
    Reflect.defineMetadata('http:requests', requests, target.constructor);
    Reflect.defineMetadata('http:requestPath', { method, path, returnType }, target.constructor, propertyKey);
  };
}
