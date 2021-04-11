import 'reflect-metadata';
import { Constructor } from '@jeafio/data';
import { HttpRequestMiddleware } from '@jeafio/http/src/HttpRequestMiddleware';

export function RequestMiddleware(middleware: Constructor<HttpRequestMiddleware>) {
  return (target: object, propertyKey?: string): void => {
    if (typeof propertyKey === 'string') {
      const middlewares = Reflect.getMetadata('http:requestMiddlewares', target.constructor, propertyKey) || [];
      middlewares.push(middleware);
      Reflect.defineMetadata('http:requestMiddlewares', middlewares, target.constructor, propertyKey);
    } else {
      const middlewares = Reflect.getMetadata('http:requestMiddlewares', target) || [];
      middlewares.push(middleware);
      Reflect.defineMetadata('http:requestMiddlewares', middlewares, target);
    }
  };
}
