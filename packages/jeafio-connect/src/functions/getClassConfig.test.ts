import { RequestConfig, RequestHeader, RequestMiddleware, RequestParam, ResponseMiddleware } from '@jeafio/http';
import { getClassConfig } from './getClassConfig';
import { ConnectConfig } from '../ConnectConfig';

describe('getClassConfig', () => {
  it('should return complete class config', () => {
    @RequestHeader('Content-Type', 'application/json')
    @RequestParam('filter', 'qa')
    @RequestConfig({})
    @RequestMiddleware({} as any)
    @ResponseMiddleware({} as any)
    class A {}

    expect(getClassConfig(A)).toEqual({
      responseMiddlewares: [{} as any],
      requestMiddlewares: [{} as any],
      requestParam: { filter: 'qa' },
      requestHeaders: { 'Content-Type': 'application/json' },
      requestConfig: {},
    } as ConnectConfig);
  });
});
