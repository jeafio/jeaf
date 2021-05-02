import http from 'http';
import { Connect } from './Connect';
import { IncomingMessageFixture } from '../tests/fixtures/IncomingMessageFixture';
import { HTTPRequest, HTTPResponse } from '@jeafio/http';

describe('Connect', function() {
  beforeEach(() => {
    jest.spyOn(http, 'request').mockImplementation(((options: any, callback: any) => {
      callback(IncomingMessageFixture());
    }) as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test.each(['get', 'post', 'put', 'delete', 'patch', 'trace', 'options'] as ('get' | 'post' | 'put' | 'delete' | 'patch' | 'trace' | 'options')[])('Should make basic %p request', async (requestType) => {
    const connect = await Connect[requestType]('/a/b/c').send();
    expect(http.request).toHaveBeenCalledWith({
      headers: {},
      method: requestType.toUpperCase(),
      host: 'localhost',
      port: 443,
      path: '/a/b/c',
      protocol: 'https',
    }, expect.any(Function));
  });

  it('should call request interceptor and continues', async function() {
    const connect = await Connect.get('/a/b/c').addRequestInterceptor(async (req: HTTPRequest) => {
      req.setPort(8000);
    }).send();

    expect(http.request).toHaveBeenCalledWith({
      headers: {},
      method: 'GET',
      host: 'localhost',
      port: 8000,
      path: '/a/b/c',
      protocol: 'https',
    }, expect.any(Function));
  });

  it('should call request interceptor and bail out', async function() {
    const connect = await Connect.get('/a/b/c')
      .addRequestInterceptor(async (req: HTTPRequest) => {
        return new HTTPResponse(401);
      })
      .send();

    expect(http.request).not.toHaveBeenCalled();
    expect(connect.getStatusCode()).toBe(401);
  });

  it('should call all response interceptors and continue', async function() {
    const connect = await Connect.get('/a/b/c')
      .addResponseInterceptor(async (req, res) => {
        res.setText('1234');
      })
      .send();

    expect(await connect.getText()).toBe('1234');
  });

  it('should call all response interceptors and bail', async function() {
    const connect = await Connect.get('/a/b/c')
      .addResponseInterceptor(async (req, res) => {
        return new HTTPResponse(200).setText('1234');
      })
      .send();

    expect(await connect.getText()).toBe('1234');
  });
});