import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';
import { HttpSession } from './HttpSession';

export interface HttpResponseMiddleware {
  onResponse(req: Readonly<HttpRequest>, res: HttpResponse, session: HttpSession): Promise<HttpResponse | void>;
}
