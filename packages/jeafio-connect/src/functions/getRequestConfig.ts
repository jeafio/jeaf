import { ConnectRequestConfig } from '../ConnectRequestConfig';
import { ConnectConfig } from '../ConnectConfig';

export function getRequestConfig(
  classConfig: ConnectConfig,
  constructor: Function,
  propertyKey: string,
): ConnectRequestConfig {
  const requestPath = Reflect.getMetadata('http:requestPath', constructor, propertyKey);
  const requestBody = Reflect.getMetadata('http:requestBody', constructor, propertyKey);
  const requestConfig = Reflect.getMetadata('http:requestConfig', constructor, propertyKey) || {};
  const requestHeaders = Reflect.getMetadata('http:requestHeader', constructor, propertyKey) || {};
  const requestMiddlewares = Reflect.getMetadata('http:requestMiddlewares', constructor, propertyKey) || [];
  const responseMiddlewares = Reflect.getMetadata('http:responseMiddlewares', constructor, propertyKey) || [];
  const requestParam = Reflect.getMetadata('http:requestParam', constructor, propertyKey) || {};
  return {
    requestPath,
    requestBody,
    requestConfig: {
      ...classConfig.requestConfig,
      ...requestConfig,
    },
    requestParam: {
      ...classConfig.requestParam,
      ...requestParam,
    },
    requestHeaders: {
      ...classConfig.requestHeaders,
      ...requestHeaders,
    },
    requestMiddlewares: [...classConfig.requestMiddlewares, ...requestMiddlewares],
    responseMiddlewares: [...classConfig.responseMiddlewares, ...responseMiddlewares],
  };
}
