import { Readable } from 'stream';

/**
 * The HTTPRequest wraps the native IncomingMessage object and
 * provides utility functions.
 */
export class HTTPMessage {
  /**
   * An object containing all request headers.
   * @private
   */
  protected headers: Record<string, string | string[]> = {};

  /**
   * The request body
   * @private
   */
  protected body?: Readable;


  public async getText(): Promise<string | undefined> {
    if (!this.body) return;
    return new Promise((resolve) => {
      let data = '';
      (this.body as Readable).on('data', (chunk) => {
        data += chunk;
      }).on('end', () => resolve(data));
    });
  }

  public async getJSON(): Promise<object | undefined> {
    const text = await this.getText();
    if (!text) return;
    return JSON.parse(text);
  }

  public getBody(): Readable | undefined {
    return this.body;
  }

  public setBody(body: Readable): this {
    this.body = body;
    return this;
  }

  public setText(text: string): this {
    this.body = Readable.from(text);
    return this;
  }

  public setJson(object: object): this {
    this.setHeader('Content-Type', 'application/json');
    this.setText(JSON.stringify(object));
    return this;
  }

  public deleteHeader(name: string): this {
    delete this.headers[name];
    return this;
  }

  /**
   * Sets the value of the header
   * @param name
   * @param value
   */
  public setHeader(name: string, value: string | string[]): this {
    this.headers[name] = value;
    return this;
  }

  /*
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
  public getHeaders(): Record<string, string | string[]> {
    return { ...this.headers };
  }
}