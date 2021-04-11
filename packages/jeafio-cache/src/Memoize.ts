export interface IMemoizeConfig {
  comparator?: (a: unknown, b: unknown) => boolean;
  size?: number;
  time?: number;
}

export class Memoize {
  /**
   * Contains all cached results.
   */
  private readonly cache = new Map();

  /**
   * Contains the original function.
   */
  private readonly fnc;

  /**
   * Max cache size.
   */
  private readonly size;

  /**
   * Max cache time.
   */
  private readonly time;

  /**
   * @constructor
   * @param fnc
   * @param config
   */
  constructor(fnc: Function, config?: IMemoizeConfig) {
    config = { size: -1, time: -1, ...config };
    this.fnc = fnc;
    this.size = config.size;
    this.time = config.time;
  }

  /**
   * Clears all cashed data.
   */
  public clear(): void {
    this.cache.clear();
  }

  /**
   * Runs the wrapped function.
   * @param args
   */
  public run(...args: unknown[]): unknown {
    const l = args.length - 1;
    let pointer = this.cache;
    for (let i = 0; i < l; i++) {
      const a = args[0];
      if (pointer.has(a)) {
        pointer = pointer.get(a);
      } else {
        const m = new Map();
        pointer.set(a, m);
        pointer = m;
      }
    }
    const arg = args[l];
    if (pointer.has(arg)) {
      const cachedResult = pointer.get(arg);
      if (cachedResult.valid === true) {
        if (this.size && (this.size === -1 || cachedResult.count < this.size)) {
          cachedResult.count++;
          return cachedResult.result;
        } else {
          return this.addEntry(arg, pointer, args);
        }
      } else {
        return this.addEntry(arg, pointer, args);
      }
    } else {
      return this.addEntry(arg, pointer, args);
    }
  }

  private addEntry(arg: unknown, map: Map<unknown, unknown>, args: unknown[]): unknown {
    const v = this.fnc(...args);
    const resultObject = {
      count: 0,
      valid: true,
      result: v,
      timer: null,
    } as { count: number, valid: boolean, result: unknown, timer: number | null };
    if (resultObject.timer) {
      clearTimeout(resultObject.timer);
    }
    if (this.time && this.time > -1) {
      resultObject.timer = setTimeout(() => {
        resultObject.valid = false;
      }, this.time);
    }
    map.set(arg, resultObject);
    return v;
  }
}
