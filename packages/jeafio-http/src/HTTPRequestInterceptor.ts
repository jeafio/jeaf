import { HTTPIncomingRequest } from './HTTPIncomingRequest';
import { HTTPSession } from './HTTPSession';
import { HTTPResponse } from './HTTPResponse';

export type HTTPRequestInterceptor = (req: HTTPIncomingRequest, session: HTTPSession) => Promise<HTTPResponse> | Promise<void>;