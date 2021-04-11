import { HttpRequestMiddleware } from './HttpRequestMiddleware';
import { HttpRequestMethod } from './HttpRequestMethod';
import { Constructor } from '@jeafio/data';
import { HttpRequest } from './HttpRequest';

export interface HttpRequestMeta {
  requests: string[];
  requestPath: {
    method: HttpRequestMethod;
    path: string;
    returnType: PromiseConstructor | Constructor<HttpRequest>;
  };
  requestConfig: {};
  requestHeaders: Record<string, string>;
  requestMiddlewares: HttpRequestMiddleware[];
  requestParam: Record<string, string>;
  requestBody:
    | {
        type: 'static';
        value: unknown;
      }
    | {
        type: 'parameter';
        index: number;
      };
}
