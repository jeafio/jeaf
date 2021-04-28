import assert from 'assert';

export function buildPath(path: string, parameters: Record<string, string>, queries: Record<string, string>): string {
  let finalPath = path;
  assert(!path.includes('?'), 'The path should not include query parameter');
  const queryString = Object.keys(queries).map((key) => `${key}=${encodeURI(queries[key])}`).join('&');
  if (queryString) {
    finalPath += `?${queryString}`;
  }
  Object.keys(parameters).forEach((key) => {
    finalPath = finalPath.replace(new RegExp(`{${key}}`, 'g'), parameters[key]);
  });
  return finalPath;
}