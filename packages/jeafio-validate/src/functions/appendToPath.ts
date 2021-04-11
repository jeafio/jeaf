/**
 * Appends a property name to a path
 * @param path
 * @param propertyKey
 */
export function appendToPath(path: string, propertyKey: string): string {
  if (path) {
    if (propertyKey.match(/^\[[0-9]*]$/)) {
      return `${path}${propertyKey}`;
    }
    return `${path}.${propertyKey}`;
  }
  return propertyKey;
}
