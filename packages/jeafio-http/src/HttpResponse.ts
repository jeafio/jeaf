import { HttpMessage } from './HttpMessage';

export class HttpResponse<T> extends HttpMessage {
  /**
   * The response status code
   * @private
   */
  private status = 200;

  /**
   * Sets the response status code.
   * @param status
   */
  public setStatus(status: number): this {
    this.status = status;
    return this;
  }

  /**
   * Returns the response status.
   */
  public getStatus(): number {
    return this.status;
  }
}
