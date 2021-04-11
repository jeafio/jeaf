export function isPrimitive(type: unknown): boolean {
  return (
    type === Number ||
    type === Boolean ||
    type === Function ||
    type === String ||
    type === Symbol ||
    type === Object ||
    type === null ||
    type === undefined
  );
}
