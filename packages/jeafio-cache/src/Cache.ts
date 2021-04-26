export interface Cache<T> {
  put(key: string, value: T): void;
  get(key: string): T | undefined;
}
