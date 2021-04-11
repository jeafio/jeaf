/**
 * Helper Type to describe a constructor Function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T extends object = object> = new (...args: any[]) => T;
