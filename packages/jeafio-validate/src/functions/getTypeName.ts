/**
 * Returns the name of a primitive value.
 * @param type
 */
export function getTypeName(type: unknown): string {
  if (type === undefined) return 'undefined';
  if (type === null) return 'null';
  return Object.getPrototypeOf(type).constructor.name;
}
