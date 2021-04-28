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
   * The host to connect to
   * @protected
   */
  protected host = 'localhost';

  /**
   * The port to use
   * @protected
   */
  protected port = 443;

  /**
   * The protocol to use
   * @protected
   */
  protected protocol = 'https';

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

  public setProtocol(protocol: string): this {
    this.protocol = protocol;
    return this;
  }

  public getProtocol(): string {
    return this.protocol;
  }

  public setHost(host: string): this {
    this.host = host;
    return this;
  }

  public setPort(port: number): this {
    this.port = port;
    return this;
  }

  public getHost(): string {
    return this.host;
  }

  public getPort(): number {
    return this.port;
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

  public setCookie(name: string, value: string): this {
    this.cookies[name] = value;
    return this;
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

  public setQuery(name: string, value: string): this {
    this.queries[name] = value;
    return this;
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