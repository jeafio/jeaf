import { HTTPCookie } from './HTTPCookie';
import { IncomingHttpHeaders } from 'http';

export class HTTPResponse {
  private statusCode: number;
  private headers: Record<string, string> = {};
  private queries: Record<string, string> = {};
  private cookies: HTTPCookie[] = [];

  constructor(statusCode = 200) {
    this.statusCode = statusCode;
  }

  public setStatusCode(statusCode: number): this {
    this.statusCode = statusCode;
    return this;
  }

  public getStatusCode(): number {
    return this.statusCode;
  }

  public hasCookie(name: string): boolean {
    return !!this.cookies.find(c => c.getName() === name);
  }

  public getCookie(name: string): HTTPCookie | undefined {
    return this.cookies.find(c => c.getName() === name);
  }

  public addCookie(cookie: HTTPCookie): this {
    this.cookies.push(cookie);
    return this;
  }

  public deleteCookie(name: string): this {
    const index = this.cookies.findIndex(c => c.getName() === name);
    if (index > -1) {
      this.cookies.splice(index, 1);
    }
    return this;
  }

  /**
   * Returns true if the query exists.
   * @param name
   */
  public hasQuery(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.queries, name);
  }

  public deleteQuery(name: string): this {
    delete this.queries[name];
    return this;
  }

  public setQuery(name: string, value: string | number | boolean): this {
    this.queries[name] = value.toString();
    return this;
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

  public deleteHeader(name: string): this {
    delete this.headers[name];
    return this;
  }

  public setHeader(name: string, value: string | number | boolean): this {
    this.headers[name] = value.toString();
    return this;
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
}