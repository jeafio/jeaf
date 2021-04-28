import { IncomingMessage } from 'http';
import { parseCookies } from './functions/parseCookies';
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
    this.cookies = req.headers['set-cookie']?.map(HTTPCookie.fromString) || [];
    this.setBody(req);
  }

  /**
   * Returns the original request.
   */
  public getRequest(): IncomingMessage {
    return this.request;
  }
}