import assert from 'assert';

/**
 * Compares a path to a pattern and returns all variables
 * or an empty object on success. If the path does not match
 * the pattern, the function will return null.
 * @param pattern The pattern to compare the path with
 * @param path A valid http resource path
 */
export function matchPatch(pattern: string, path: string): Record<string, string> | null {
  assert(path === '/' || !path.endsWith('/'), 'Path can not end with a slash');
  assert(path === '/' || !pattern.endsWith('/'), 'Pattern can not end with a slash');
  if (pattern === '*') return {};
  if (pattern === path) return {};
  if (pattern.includes('*') || pattern.includes('{')) {
    const regex = new RegExp(pattern
      .replace('*', '.*')
      .replace(/{(.*?)}/g, '(?<$1>.+?)') + '$', 'i') ;
    const match = regex.exec(path);
    if (match) {
      return match.groups || {};
    }
  }
  return null;
}