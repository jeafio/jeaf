import { matchPatch } from './matchPatch';

describe('matchPath', () => {
  it('should match the root path', () => {
    expect(matchPatch('/', '/')).toEqual({});
  });

  it('should match subdirectory', () => {
    expect(matchPatch('/a/b', '/a/b')).toEqual({});
  });

  it('should return null if path does not match', () => {
    expect(matchPatch('/a/b', '/a/b/c')).toBeNull();
  });

  it('should match variable', () => {
    expect(matchPatch('/a/{b}/c', '/a/1234/c')).toEqual({ b: '1234' });
  });

  it('should match multiple variables', () => {
    expect(matchPatch('/a/{a}/c/{b}', '/a/1234/c/5678')).toEqual({ a: '1234', b: '5678' });
  });

  it('should match whole path', () => {
    expect(matchPatch('/a/*', '/a/b')).toEqual({});
    expect(matchPatch('/a/*', '/a/b/c')).toEqual({});
  });

  it('should match all paths', () => {
    expect(matchPatch('*', '/')).toEqual({});
    expect(matchPatch('*', '/a/b/c')).toEqual({});
    expect(matchPatch('*', '/a')).toEqual({});
  });

  it('should throw if pattern contains an ending slash', () => {
    expect(() => {
      matchPatch('/a/b/', '/a/b');
    }).toThrowError('Pattern can not end with a slash');
  });

  it('should throw if path contains an ending slash', () => {
    expect(() => {
      matchPatch('/a/b', '/a/b/');
    }).toThrowError('Path can not end with a slash');
  });
});