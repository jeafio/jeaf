import { parsePath } from './parsePath';

describe('parsePath', () => {

  it('should remove ending slashes', () => {
    expect(parsePath('/a/b/')).toEqual({
      path: '/a/b',
      queries: {}
    })
  });

  it('should return path with empty queries', () => {
    expect(parsePath('/a/b')).toEqual({
      path: '/a/b',
      queries: {}
    })
  });

  it('should return path with single query', () => {
    expect(parsePath('/a/b?a=b')).toEqual({
      path: '/a/b',
      queries: {
        a: 'b'
      }
    })
  });

  it('should return path with multiple queries', () => {
    expect(parsePath('/a/b?a=b&b=c')).toEqual({
      path: '/a/b',
      queries: {
        a: 'b',
        b: 'c'
      }
    })
  });
});