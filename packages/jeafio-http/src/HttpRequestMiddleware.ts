import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';
import { HttpSession } from './HttpSession';

export interface HttpRequestMiddleware {
  onRequest?(req: HttpRequest, session: HttpSession): Promise<HttpResponse | void>;
}
