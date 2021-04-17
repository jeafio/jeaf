import { HTTPResponse } from './HTTPResponse';
import { HTTPRequest } from './HTTPRequest';
import { HTTPSession } from './HTTPSession';

export type HTTPResponseInterceptor = (req: HTTPRequest, res: HTTPResponse, session: HTTPSession) => Promise<HTTPResponse> | Promise<void>;