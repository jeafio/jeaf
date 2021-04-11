import { getPath } from './getPath';

export function getPropertyPaths(obj: object): string[] {
  const paths: string[] = [];
  getPropertyPathOfObj(obj, '', paths);
  return paths;
}

function getPropertyPathOfObj(obj: object, path: string, paths: string[]) {
  for (const key in obj) {
    const value = obj[key as keyof typeof obj];
    const propertyPath = getPath(path, key);
    paths.push(propertyPath);
    if (typeof value === 'object' && !Array.isArray(value)) {
      getPropertyPathOfObj(value, propertyPath, paths);
    }
  }
}
