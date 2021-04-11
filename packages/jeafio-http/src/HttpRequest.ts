import { HttpMessage } from './HttpMessage';
import { HttpRequestMethod } from './HttpRequestMethod';

export class HttpRequest extends HttpMessage {
  /**
   * The request method
   * @private
   */
  private method: HttpRequestMethod = 'GET';

  /**
   * The destination host
   * @private
   */
  private host = 'localhost';

  /**
   * The destination port
   * @private
   */
  private port = 443;

  /**
   * Sets the request method.
   * @param method
   */
  public setMethod(method: HttpRequestMethod): this {
    this.method = method;
    return this;
  }

  /**
   * Returns the request method.
   */
  public getMethod(): HttpRequestMethod {
    return this.method;
  }

  /**
   * Sets the destination host
   * @param host
   */
  public setHost(host: string): this {
    this.host = host;
    return this;
  }

  /**
   * Returns the destination host
   */
  public getHost(): string {
    return this.host;
  }

  /**
   * Sets the destination port
   * @param port
   */
  public setPort(port: number): this {
    this.port = port;
    return this;
  }

  /**
   * Returns the destination port
   */
  public getPort(): number {
    return this.port;
  }
}
