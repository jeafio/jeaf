import { ConnectConfig } from '../ConnectConfig';
import 'reflect-metadata';

export function getClassConfig(constructor: Function): ConnectConfig {
  const requestConfig = Reflect.getMetadata('http:requestConfig', constructor) || {};
  const requestHeaders = Reflect.getMetadata('http:requestHeader', constructor) || {};
  const requestMiddlewares = Reflect.getMetadata('http:requestMiddlewares', constructor) || [];
  const responseMiddlewares = Reflect.getMetadata('http:responseMiddlewares', constructor) || [];
  const requestParam = Reflect.getMetadata('http:requestParam', constructor) || {};
  return {
    requestConfig,
    requestHeaders,
    requestParam,
    requestMiddlewares,
    responseMiddlewares,
  };
}
