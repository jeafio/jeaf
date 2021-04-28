import { buildPath } from './buildPath';

describe('buildPath', function() {
  it('should build a path without queries and parameter', function() {
    expect(buildPath('/a/b/c', {}, {})).toBe('/a/b/c');
  });

  it('should build a path with one query', function() {
    expect(buildPath('/a/b/c', {}, { 'q': '1234' })).toBe('/a/b/c?q=1234');
  });

  it('should build a path with multiple queries', function() {
    expect(buildPath('/a/b/c', {}, { 'q': '1234', 'a': 'test' })).toBe('/a/b/c?q=1234&a=test');
  });

  it('should decode query parameter', function() {
    expect(buildPath('/a/b/c', {}, { 'q': 'ä' })).toBe('/a/b/c?q=%C3%A4');
  });

  it('should throw an error if path already defines query parameter', function() {
    expect(() => {
      buildPath('/a/b/c?a', {}, { })
    }).toThrowError('The path should not include query parameter');
  });

  it('should replace single placeholder with parameter', function() {
    expect(buildPath('/a/{name}/b', {name: 'test'}, {})).toBe('/a/test/b');
  });

  it('should replace multiple placeholders with the same name with parameter', function() {
    expect(buildPath('/a/{name}/b/{name}', {name: 'test'}, {})).toBe('/a/test/b/test');
  });

  it('should replace multiple placeholders with different names with parameter', function() {
    expect(buildPath('/a/{name}/b/{a}', {name: 'test', a: '1234'}, {})).toBe('/a/test/b/1234');
  });
});