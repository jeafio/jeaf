import { HTTPRequestMethod } from './HTTPRequestMethod';
import { IncomingMessage } from 'http';
import { parsePath } from './functions/parsePath';
import { parseCookies } from './functions/parseCookies';
import { HTTPRequest } from './HTTPRequest';

/**
 * The HTTPRequest wraps the native IncomingMessage object and
 * provides utility functions.
 */
export class HTTPIncomingRequest extends HTTPRequest {

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
    super(req.method as HTTPRequestMethod, path);
    this.request = req;
    this.method = req.method as HTTPRequestMethod;
    this.path = path;
    this.queries = queries;
    this.headers = req.headers as Record<string, string>;
    this.cookies = parseCookies(req.headers.cookie);
    this.setBody(req);
  }

  /**
   * Returns the original request.
   */
  public getRequest(): IncomingMessage {
    return this.request;
  }
}