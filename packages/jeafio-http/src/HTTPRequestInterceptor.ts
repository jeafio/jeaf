import { HTTPRequest } from './HTTPRequest';
import { HTTPSession } from './HTTPSession';
import { HTTPResponse } from './HTTPResponse';

export type HTTPRequestInterceptor = (req: HTTPRequest, session: HTTPSession) => Promise<HTTPResponse> | Promise<void>;