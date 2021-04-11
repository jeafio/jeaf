export function getPath(path: string, property: string): string {
  if (path === '') {
    return property;
  }
  return `${path}.${property}`;
}
