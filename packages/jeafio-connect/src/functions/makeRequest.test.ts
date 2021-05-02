import http from 'http';
import { Connect } from '../Connect';
import { makeRequest } from './makeRequest';

describe('makeRequest', function() {
  beforeEach(() => {
    jest.spyOn(http, 'request').mockImplementation(((options: any, callback: any) => {
      callback();
    }) as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('should build basic request', function() {
    const connect = new Connect('GET', '/a/b/c');
    const response = makeRequest(connect);
    expect(http.request).toHaveBeenCalledWith({
      headers: {},
      method: 'GET',
      host: 'localhost',
      port: 443,
      path: '/a/b/c',
      protocol: 'https',
    }, expect.any(Function));
  });

  it('should attach cookie header if some exist', function() {
    const connect = new Connect('GET', '/a/b/c').setCookie('a', 'b');
    const response = makeRequest(connect);
    expect(http.request).toHaveBeenCalledWith({
      headers: {
        'Cookies': 'a=b'
      },
      method: 'GET',
      host: 'localhost',
      port: 443,
      path: '/a/b/c',
      protocol: 'https',
    }, expect.any(Function));
  });
});