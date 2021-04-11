import { HttpRequestMeta } from '@jeafio/http/src/HttpRequestMeta';
import { HttpResponseMeta } from '@jeafio/http/src/HttpResponseMeta';

export interface ConnectRequestConfig
  extends Omit<HttpRequestMeta, 'requests'>,
    Pick<HttpResponseMeta, 'responseMiddlewares'> {}
