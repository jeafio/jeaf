import { HTTPRequest } from './HTTPRequest';
import { IncomingMessageFixture } from '../tests/fixtures/IncomingMessageFixture';
import { IncomingMessage } from 'http';

describe('HTTPRequest', () => {

  let request: HTTPRequest;

  beforeEach(() => {
    request = new HTTPRequest(IncomingMessageFixture as IncomingMessage);
  });

  it('should convert an IncomingMessage to a HTTPRequest', () => {
    expect(request).toEqual({
      'headers': {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'connection': 'keep-alive',
        'host': 'localhost:8080',
        'postman-token': '2f435d9e-d1c8-47c8-a1de-45b05bb5b81e',
        'user-agent': 'PostmanRuntime/7.26.10',
        'cookie': 'a=b;c=d'
      },
      'method': 'GET',
      'path': '/a/b/c',
      'cookies': {
        'a': 'b',
        'c': 'd',
      },
      'queries': {
        'a': '1',
        'b': '2',
      },
      'request': IncomingMessageFixture,
    });
  });

  it('should return true if query exists', () => {
    expect(request.hasQuery('a')).toBe(true);
  });

  it('should return false if query does not exist', () => {
    expect(request.hasQuery('x')).toBe(false);
  });

  it('should return query value', () => {
    expect(request.getQuery('a')).toBe('1');
  });

  it('should return all queries', () => {
    expect(request.getQueries()).toEqual({ a: '1', b: '2' });
  });

  it('should return true if header exists', () => {
    expect(request.hasHeader('accept')).toBe(true);
  });

  it('should return false if header does not exist', () => {
    expect(request.hasHeader('content-tyoe')).toBe(false);
  });

  it('should return header value', () => {
    expect(request.getHeader('accept')).toBe('*/*');
  });

  it('should return all headers', () => {
    expect(request.getHeaders()).toEqual({
      'accept': '*/*',
      'accept-encoding': 'gzip, deflate, br',
      'connection': 'keep-alive',
      'host': 'localhost:8080',
      'postman-token': '2f435d9e-d1c8-47c8-a1de-45b05bb5b81e',
      'user-agent': 'PostmanRuntime/7.26.10',
      'cookie': 'a=b;c=d'
    });
  });

  it('should return request method', () => {
    expect(request.getMethod()).toEqual('GET');
  });

  it('should return path', () => {
    expect(request.getPath()).toEqual('/a/b/c')
  });

  it('should return original request', () => {
    expect(request.getRequest()).toBe(IncomingMessageFixture);
  });

  it('should return true if cookie exists', () => {
    expect(request.hasCookie('a')).toBe(true);
  });

  it('should return false if cookie does not exist', () => {
    expect(request.hasCookie('x')).toBe(false);
  });

  it('should return cookie value', () => {
    expect(request.getCookie('a')).toBe('b');
  });

  it('should return all cookies', () => {
    expect(request.getCookies()).toEqual({
      a: 'b',
      c: 'd'
    });
  });
});