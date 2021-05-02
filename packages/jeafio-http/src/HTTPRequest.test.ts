import { HTTPIncomingRequest } from './HTTPIncomingRequest';
import { IncomingMessageFixture } from '../tests/fixtures/IncomingMessageFixture';
import { IncomingMessage } from 'http';
import { Readable } from 'stream';

describe('HTTPRequest', () => {

  let request: HTTPIncomingRequest;
  let message: IncomingMessage;

  beforeEach(() => {
    message = IncomingMessageFixture();
    request = new HTTPIncomingRequest(message);
  });

  it('should have https as default protocol', function() {
    expect(request.getProtocol()).toBe('https');
  });

  it('should set protocol', function() {
    request.setProtocol('http');
    expect(request.getProtocol()).toBe('http');
  });

  it('should have localhost as default host', function() {
    expect(request.getHost()).toBe('localhost');
  });

  it('should set host', function() {
    request.setHost('127.0.0.1')
    expect(request.getHost()).toBe('127.0.0.1');
  });

  it('should have 443 as default port', function() {
    expect(request.getPort()).toBe(443);
  });

  it('should set port', function() {
    request.setPort(80)
    expect(request.getPort()).toBe(80);
  });

  it('should convert an IncomingMessage to a HTTPRequest', () => {
    expect(request).toEqual({
      'body': expect.any(Object),
      'host': 'localhost',
      'port': 443,
      'protocol': 'https',
      'headers': {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'connection': 'keep-alive',
        'host': 'localhost:8080',
        'postman-token': '2f435d9e-d1c8-47c8-a1de-45b05bb5b81e',
        'user-agent': 'PostmanRuntime/7.26.10',
        'cookie': 'a=b;c=d',
        'set-cookie': ['a=b', 'c=d']
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
      'request': message,
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
      'cookie': 'a=b;c=d',
      'set-cookie': ['a=b', 'c=d']
    });
  });

  it('should return request method', () => {
    expect(request.getMethod()).toEqual('GET');
  });

  it('should return path', () => {
    expect(request.getPath()).toEqual('/a/b/c');
  });

  it('should return original request', () => {
    expect(request.getRequest()).toBe(message);
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
      c: 'd',
    });
  });

  it('should return body as text', async () => {
    expect(await request.getText()).toEqual('{"name": "test"}');
  });

  it('should return body as json', async () => {
    expect(await request.getJSON()).toEqual( {"name": "test"});
  });

  it('should return raw body', (done) => {
    const listener = jest.fn();
    (request.getBody() as Readable).on('data', listener).on('end', () => {
      expect(listener).toHaveBeenCalledWith(Buffer.from('{"name": "test"}'));
      done();
    });
  });

  it('should set method', function() {
    request.setMethod('POST');
    expect(request.getMethod()).toBe('POST')
  });

  it('should set path', function() {
    request.setPath('/test/1234');
    expect(request.getPath()).toBe('/test/1234')
  });

  it('should set cookie', function() {
    request.setCookie('a', '1234');
    expect(request.getCookie('a')).toBe('1234');
  });

  it('should set query', function() {
    request.setQuery('a', '1234');
    expect(request.getQuery('a')).toBe('1234');
  });
});