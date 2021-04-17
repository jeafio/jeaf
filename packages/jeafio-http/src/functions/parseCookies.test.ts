import { parseCookies } from './parseCookies';

describe('parseCookies', () => {
  it('should return single cookie', () => {
    expect(parseCookies('a=b')).toEqual({
      a: 'b'
    })
  });

  it('should return multiple cookies', () => {
    expect(parseCookies('a=b;c=d')).toEqual({
      a: 'b',
      c: 'd'
    })
  });

  it('should return no cookies', () => {
    expect(parseCookies('')).toEqual({});
  });
});