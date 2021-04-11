import {
  RequestBody,
  RequestConfig,
  RequestHeader,
  RequestMiddleware,
  RequestParam,
  RequestPath,
  ResponseMiddleware,
} from '@jeafio/http';
import { getClassConfig } from './getClassConfig';
import { getRequestConfig } from './getRequestConfig';

describe('getRequestConfig', () => {
  it('should merge all request configs', () => {
    @RequestHeader('Content-Type', 'application/json')
    @RequestParam('filter', 'qa')
    @RequestConfig({})
    @RequestMiddleware({} as any)
    @ResponseMiddleware({} as any)
    class A {
      @RequestHeader('Content-Length', 1024)
      @RequestParam('q', 'a')
      @RequestConfig({})
      @RequestMiddleware({} as any)
      @ResponseMiddleware({} as any)
      @RequestBody('1234')
      @RequestPath('GET', '/')
      public test(): void {}
    }

    const classConfig = getClassConfig(A);
    expect(getRequestConfig(classConfig, A, 'test')).toEqual({
      requestBody: {
        type: 'static',
        value: '1234',
      },
      requestConfig: {},
      requestHeaders: {
        'Content-Length': 1024,
        'Content-Type': 'application/json',
      },
      requestMiddlewares: [{}, {}],
      requestParam: {
        filter: 'qa',
        q: 'a',
      },
      requestPath: {
        method: 'GET',
        path: '/',
      },
      responseMiddlewares: [{}, {}],
    });
  });
});
