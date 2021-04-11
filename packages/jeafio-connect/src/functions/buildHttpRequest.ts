import { ConnectRequestConfig } from '../ConnectRequestConfig';
import { HttpRequest } from '@jeafio/http/src/HttpRequest';

export function buildHttpRequest(requestConfig: ConnectRequestConfig): HttpRequest {
  const request = new HttpRequest();
  return request;
}
