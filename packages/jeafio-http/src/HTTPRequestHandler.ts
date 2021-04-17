import { HTTPRequest } from './HTTPRequest';
import { HTTPResponse } from './HTTPResponse';
import { HTTPSession } from './HTTPSession';

export type HTTPRequestHandler = (req: HTTPRequest, session: HTTPSession) => Promise<HTTPResponse>;