import { HTTPResponse } from './HTTPResponse';
import { HTTPCookie } from './HTTPCookie';
import { getStream } from '../tests/util/getStream';
import { Readable } from 'stream';

describe('HTTPResponse', () => {

  let response: HTTPResponse;

  beforeEach(() => {
    response = new HTTPResponse();
  });

  it('should return the status code', () => {
    expect(response.getStatusCode()).toBe(200);
  });

  it('should set the status code', () => {
    expect(response.getStatusCode()).toBe(200);
    response.setStatusCode(400);
    expect(response.getStatusCode()).toBe(400);
  });

  it('should add a new cookie', () => {
    const cookie = new HTTPCookie('a', '1234');
    response.addCookie(cookie);
    expect(response.getCookies()).toContain(cookie);
  });

  it('should return a cookie by name', () => {
    const cookie = new HTTPCookie('a', '1234');
    response.addCookie(cookie);
    expect(response.getCookie('a')).toBe(cookie);
  });

  it('should return true if cookie exists', () => {
    const cookie = new HTTPCookie('a', '1234');
    response.addCookie(cookie);
    expect(response.hasCookie('a')).toBe(true);
  });

  it('should return false if cookie does not exist', () => {
    expect(response.hasCookie('a')).toBe(false);
  });

  it('should remove cookie', () => {
    const cookie = new HTTPCookie('a', '1234');
    response.addCookie(cookie);
    expect(response.hasCookie('a')).toBe(true);
    response.deleteCookie('a');
    expect(response.hasCookie('a')).toBe(false);
  });


  it('should succeed if cookie does not exist when removing', () => {
    const cookie = new HTTPCookie('a', '1234');
    response.addCookie(cookie);
    response.deleteCookie('b');
    expect(response.hasCookie('a')).toBe(true);
  });

  it('should set a query parameter', () => {
    response.setQuery('q', '1234');
    expect(response.getQueries()).toEqual({ q: '1234' });
  });

  it('should remove query parameter', () => {
    response.setQuery('q', '1234');
    expect(response.getQueries()).toEqual({ q: '1234' });
    response.deleteQuery('q');
    expect(response.getQueries()).toEqual({});
  });

  it('should return query parameter by name', () => {
    response.setQuery('q', '1234');
    expect(response.getQuery('q')).toBe('1234');
  });

  it('should return true if query parameter exists', () => {
    response.setQuery('q', '1234');
    expect(response.hasQuery('q')).toBe(true);
  });

  it('should return false if query parameter exists', () => {
    expect(response.hasQuery('q')).toBe(false);
  });

});