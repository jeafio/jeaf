import { getPath } from './getPath';
import { Constructor } from '@jeafio/data';

export function getSchemaPaths(schema: Constructor): string[] {
  const paths: string[] = [];
  getSchemaPathsOfSchema(schema, '', paths);
  return paths;
}

function getSchemaPathsOfSchema(type: Constructor, path: string, paths: string[]) {
  const schema = Reflect.getMetadata('validate:schema', type);
  for (const key in schema) {
    const propertySchema = schema[key];
    const propertyPath = getPath(path, key);
    const propertyType = propertySchema.type;
    paths.push(propertyPath);
    if (propertyType !== Number && propertyType !== Boolean && propertyType !== String) {
      getSchemaPathsOfSchema(propertyType, propertyPath, paths);
    }
  }
}
