import { IncomingMessage } from 'http';
import { HTTPResponse } from './HTTPResponse';
import { HTTPCookie } from './HTTPCookie';

/**
 * The HTTPRequest wraps the native IncomingMessage object and
 * provides utility functions.
 */
export class HTTPIncomingResponse extends HTTPResponse {

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
    super(req.statusCode);
    this.request = req;
    this.headers = req.headers as Record<string, string>;
    this.cookies = this.parseCookies();
    this.setBody(req);
  }

  private parseCookies(): HTTPCookie[] {
    const setCookie = this.getHeader('set-cookie') as string[] | undefined;
    if (!setCookie) return [];
    return setCookie.map(HTTPCookie.fromString);
  }

  /**
   * Returns the original request.
   */
  public getResponse(): IncomingMessage {
    return this.request;
  }
}