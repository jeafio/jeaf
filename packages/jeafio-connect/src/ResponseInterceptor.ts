import { HTTPRequest, HTTPResponse } from '@jeafio/http';

export type ResponseInterceptor = (req: HTTPRequest, res: HTTPResponse) => Promise<HTTPResponse | void>;