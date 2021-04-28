import { HTTPResponse } from '@jeafio/http';
import { Connect } from '../Connect';
import { buildPath } from './buildPath';
import http from 'http';

export async function makeRequest(request: Connect): Promise<HTTPResponse> {
  const path = buildPath(request.getPath(), request.getParams(), request.getQueries());
  const headers = request.getHeaders();
  const cookies = request.getCookies();
  if (Object.keys(cookies).length > 0) {
    headers['Cookies'] = Object.keys(cookies).map((key) => `${key}=${cookies[key]}`);
  }

  return new Promise((resolve) => {
    http.request({
      path,
      host: request.getHost(),
      port: request.getPort(),
      protocol: 'https',
      method: request.getMethod(),
      headers: request.getHeaders(),
    }, (response) => {
      resolve(new HTTPResponse());
    });
  });
}