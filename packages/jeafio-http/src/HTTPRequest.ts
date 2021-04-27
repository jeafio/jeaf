import { HTTPRequestMethod } from './HTTPRequestMethod';
import { HTTPMessage } from './HTTPMessage';

/**
 * The HTTPRequest wraps the native IncomingMessage object and
 * provides utility functions.
 */
export class HTTPRequest extends HTTPMessage {

  /**
   * The incoming request method.
   * @private
   */
  protected method: HTTPRequestMethod;

  /**
   * The path part of the request url.
   * @private
   */
  protected path: string;

  /**
   * An object containing all url queries.
   * @private
   */
  protected queries: Record<string, string> = {};

  /**
   * An object containing all cookies.
   * @private
   */
  protected cookies: Record<string, string> = {};

  /**
   * @constructor
   * @param method
   * @param path
   */
  constructor(method: HTTPRequestMethod, path: string) {
    super();
    this.method = method;
    this.path = path;
  }

  public setMethod(method: HTTPRequestMethod): this {
    this.method = method;
    return this;
  }

  public setPath(path: string): this {
    this.path = path;
    return this;
  }

  public hasCookie(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.cookies, name);
  }

  public getCookie(name: string): string {
    return this.cookies[name];
  }

  public getCookies(): Record<string, string> {
    return { ...this.cookies };
  }

  /**
   * Returns true if the query exists.
   * @param name
   */
  public hasQuery(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.queries, name);
  }

  /**
   * Returns the query value.
   * @param name
   */
  public getQuery(name: string): string | string[] | undefined {
    return this.queries[name];
  }

  /**
   * Returns an object containing all queries.
   */
  public getQueries(): Record<string, string> {
    return { ...this.queries };
  }

  /**
   * Returns the request method.
   */
  public getMethod(): HTTPRequestMethod {
    return this.method;
  }

  /**
   * Returns the request path.
   */
  public getPath(): string {
    return this.path;
  }
}