import { HttpCookie } from './HTTPCookie';

describe('HTTPCookie', () => {
  it('should create a basic cookie', () => {
    expect(new HttpCookie('a', '1234').toString()).toBe('a=1234;');
  });

  it('should create a complex cookie', () => {
    expect(new HttpCookie('a', '1234', {
      path: '/a/b',
      maxAge: 1000,
      httpOnly: true
    }).toString()).toBe('a=1234; path=/a/b;Max-Age=1000;HttpOnly');
  });

  it('should add httpOnly flag', () => {
    expect(new HttpCookie('a', '1234', { httpOnly: true }).toString()).toBe('a=1234; HttpOnly');
  });

  it('should add sameSite', () => {
    expect(new HttpCookie('a', '1234', { sameSite: 'Lax' }).toString()).toBe('a=1234; SameSite=Lax');
  });

  it('should add maxAge', () => {
    expect(new HttpCookie('a', '1234', { maxAge: 1000 }).toString()).toBe('a=1234; Max-Age=1000');
  });

  it('should add path', () => {
    expect(new HttpCookie('a', '1234', { path: '/a/b/c' }).toString()).toBe('a=1234; path=/a/b/c');
  });

  it('should add domain', () => {
    expect(new HttpCookie('a', '1234', { domain: 'localhost' }).toString()).toBe('a=1234; Domain=localhost');
  });

  it('should add expires', () => {
    expect(new HttpCookie('a', '1234', { expires: new Date(0) }).toString()).toBe('a=1234; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
  });
});