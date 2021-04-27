import { HTTPResponse } from './HTTPResponse';
import { HTTPIncomingRequest } from './HTTPIncomingRequest';
import { HTTPSession } from './HTTPSession';

export type HTTPResponseInterceptor = (req: HTTPIncomingRequest, res: HTTPResponse, session: HTTPSession) => Promise<HTTPResponse> | Promise<void>;