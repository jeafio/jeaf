import { HttpResponseMiddleware } from './HttpResponseMiddleware';

export interface HttpResponseMeta {
  responseMiddlewares: HttpResponseMiddleware[];
}
