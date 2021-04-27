import { HTTPIncomingRequest } from './HTTPIncomingRequest';
import { HTTPResponse } from './HTTPResponse';
import { HTTPSession } from './HTTPSession';

export type HTTPRequestHandler = (req: HTTPIncomingRequest, session: HTTPSession) => Promise<HTTPResponse>;