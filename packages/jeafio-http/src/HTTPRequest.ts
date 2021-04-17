import { HTTPRequestMethod } from './HTTPRequestMethod';
import { IncomingMessage, IncomingHttpHeaders } from 'http';
import { parsePath } from './functions/parsePath';

/**
 * The HTTPRequest wraps the native IncomingMessage object and
 * provides utility functions.
 */
export class HTTPRequest {

  /**
   * The incoming request method.
   * @private
   */
  private readonly method: HTTPRequestMethod;

  /**
   * The path part of the request url.
   * @private
   */
  private readonly path: string;

  /**
   * An object containing all request headers.
   * @private
   */
  private readonly headers: IncomingHttpHeaders;

  /**
   * An object containing all url queries.
   * @private
   */
  private readonly queries: Record<string, string>;

  /**
   * The original IncomingMessage
   * @private
   */
  private readonly request: IncomingMessage;

  /**
   * @constructor
   * @param req
   */
  constructor(req: IncomingMessage) {
    const { path, queries } = parsePath(req.url as string);
    this.request = req;
    this.method = req.method as HTTPRequestMethod;
    this.path = path;
    this.queries = queries;
    this.headers = req.headers;
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
   * Returns true if the header exists.
   * @param name
   */
  public hasHeader(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.headers, name);
  }

  /**
   * Returns the header value.
   * @param name
   */
  public getHeader(name: string): string | string[] | undefined {
    return this.headers[name];
  }

  /**
   * Returns an object containing all headers.
   */
  public getHeaders(): IncomingHttpHeaders {
    return { ...this.headers };
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

  /**
   * Returns the original request.
   */
  public getRequest(): IncomingMessage {
    return this.request;
  }
}