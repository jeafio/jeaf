export class Evented<T> {
  /**
   * Contains a map of all listener
   * @private
   */
  private readonly listeners = new Map<string, Set<Function>>();

  /**
   * Adds an event listener
   * @param type
   * @param listener
   */
  public on<K extends keyof T>(type: K, listener: T[K]): this {
    const listeners = this.listeners.get(type as string);
    if (listeners) {
      listeners.add(listener as never);
    } else {
      this.listeners.set(
        type as string,
        new Set<Function>([listener as never]),
      );
    }
    return this;
  }

  /**
   * Removes a listener
   * @param type
   * @param listener
   */
  public removeListener<K extends keyof T>(type: K, listener: T[K]): void {
    const listeners = this.listeners.get(type as string);
    if (listeners) {
      listeners.delete(listener as never);
    }
  }

  /**
   * Emits an event
   * @param type
   * @param data
   */
  public emit<K extends keyof T>(type: K, data: unknown): void {
    const listeners = this.listeners.get(type as string);
    if (listeners) {
      for (const listener of listeners) {
        listener(data);
      }
    }
  }

  /**
   * Removes all listeners.
   */
  public clear(): void {
    this.listeners.clear();
  }
}
