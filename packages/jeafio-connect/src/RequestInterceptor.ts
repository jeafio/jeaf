import { HTTPRequest, HTTPResponse } from '@jeafio/http';

export type RequestInterceptor = (req: HTTPRequest) => Promise<HTTPResponse | void>;