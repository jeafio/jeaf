import { HTTPCookie } from './HTTPCookie';

describe('HTTPCookie', () => {
  it('should create a basic cookie', () => {
    expect(new HTTPCookie('a', '1234').toString()).toBe('a=1234;');
  });

  it('should create a complex cookie', () => {
    expect(new HTTPCookie('a', '1234', {
      path: '/a/b',
      maxAge: 1000,
      httpOnly: true,
    }).toString()).toBe('a=1234; path=/a/b;Max-Age=1000;HttpOnly');
  });

  it('should return cookie name', () => {
    const cookie = new HTTPCookie('a', '1234');
    expect(cookie.getName()).toBe('a');
  });

  it('should return cookie value', () => {
    const cookie = new HTTPCookie('a', '1234');
    expect(cookie.getValue()).toBe('1234');
  });

  it('should add httpOnly flag', () => {
    expect(new HTTPCookie('a', '1234', { httpOnly: true }).toString()).toBe('a=1234; HttpOnly');
  });

  it('should add sameSite', () => {
    expect(new HTTPCookie('a', '1234', { sameSite: 'Lax' }).toString()).toBe('a=1234; SameSite=Lax');
  });

  it('should add maxAge', () => {
    expect(new HTTPCookie('a', '1234', { maxAge: 1000 }).toString()).toBe('a=1234; Max-Age=1000');
  });

  it('should add path', () => {
    expect(new HTTPCookie('a', '1234', { path: '/a/b/c' }).toString()).toBe('a=1234; path=/a/b/c');
  });

  it('should add domain', () => {
    expect(new HTTPCookie('a', '1234', { domain: 'localhost' }).toString()).toBe('a=1234; Domain=localhost');
  });

  it('should add expires', () => {
    expect(new HTTPCookie('a', '1234', { expires: new Date(0) }).toString()).toBe('a=1234; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
  });

  it('should convert string to cookie', function() {
    const cookie = new HTTPCookie('test', '1234', {
      path: '/',
      maxAge: 10000,
      httpOnly: true,
      expires: new Date(0),
    });
    expect(HTTPCookie.fromString(cookie.toString())).toEqual({
      'config': {
        'expires': 0,
        'httpOnly': true,
        'maxAge': 10000,
        'path': '/',
      },
      'name': 'test',
      'value': '1234',
    });
  });

  it('should throw an error if field is not known', function() {
    expect(() => {
      HTTPCookie.fromString('a=b;test=1234');
    }).toThrowError(`Invalid key 'test' found in cookie definition`);
  });
});