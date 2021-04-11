import 'reflect-metadata';
import { Constructor } from '@jeafio/data';
import { HttpResponseMiddleware } from '../../HttpResponseMiddleware';

export function ResponseMiddleware(middleware: Constructor<HttpResponseMiddleware>) {
  return (target: object, propertyKey?: string): void => {
    if (typeof propertyKey === 'string') {
      const middlewares = Reflect.getMetadata('http:responseMiddlewares', target.constructor, propertyKey) || [];
      middlewares.push(middleware);
      Reflect.defineMetadata('http:responseMiddlewares', middlewares, target.constructor, propertyKey);
    } else {
      const middlewares = Reflect.getMetadata('http:responseMiddlewares', target) || [];
      middlewares.push(middleware);
      Reflect.defineMetadata('http:responseMiddlewares', middlewares, target);
    }
  };
}
