import { hasOwnProperty } from '@jeafio/data';
import { Evented } from '@jeafio/evented';

/**
 * Contains all HTTP information that are in both request and response.
 */
export class HttpMessage {
  /**
   * Contains all headers.
   * @private
   */
  private readonly headers: Record<string, string> = {};

  /**
   * Contains all parameters.
   * @private
   */
  private readonly parameters: Record<string, string> = {};

  /**
   * Contains the request body.
   * @private
   */
  private body?: Uint8Array = undefined;

  /**
   * Returns the messages body
   */
  public getBody(): Uint8Array | undefined {
    return this.body;
  }

  /**
   * Sets the messages body
   * @param body
   */
  public setBody(body: Uint8Array): this {
    this.body = body;
    return this;
  }

  /**
   * Sets the value of a parameter
   * @param name
   * @param value
   */
  public setParameter(name: string, value: string | number): this {
    this.parameters[name] = value.toString();
    return this;
  }

  /**
   * Returns the value of a parameter
   * @param name
   */
  public getParameter(name: string): string | undefined {
    return this.parameters[name];
  }

  /**
   * Removes a parameter
   * @param name
   */
  public removeParameter(name: string): this {
    delete this.parameters[name];
    return this;
  }

  /**
   * Returns true if a parameter exists.
   * @param name
   */
  public hasParameter(name: string): boolean {
    return hasOwnProperty(this.parameters, name);
  }

  /**
   * Returns all parameter.
   */
  public getAllParameters(): Record<string, string> {
    return { ...this.parameters };
  }

  /**
   * Sets the value of a header
   * @param name
   * @param value
   */
  public setHeader(name: string, value: string | number): this {
    this.headers[name] = value.toString();
    return this;
  }

  /**
   * Returns the content of a header
   * @param name
   */
  public getHeader(name: string): string | undefined {
    return this.headers[name];
  }

  /**
   * Removes a header by name.
   * @param name
   */
  public removeHeader(name: string): this {
    delete this.headers[name];
    return this;
  }

  /**
   * Returns true if the header exists.
   * @param name
   */
  public hasHeader(name: string): boolean {
    return hasOwnProperty(this.headers, name);
  }

  /**
   * Returns all headers
   */
  public getAllHeaders(): Record<string, string> {
    return { ...this.headers };
  }
}
